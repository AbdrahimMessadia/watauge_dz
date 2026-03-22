const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');
const db       = require('../models/database');
const { sendOTPEmail, sendResetEmail } = require('../services/email');

const saltHash  = s => crypto.createHash('sha256').update(s+'wq_dz_salt').digest('hex');
const getIP     = req => (req.headers['x-forwarded-for']||'').split(',')[0].trim() || req.socket.remoteAddress || '0.0.0.0';
const normEmail = e => String(e).trim().toLowerCase();
const isEmail   = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const genOTP    = () => Math.floor(100000+Math.random()*900000).toString();

// ── Rate Limiting ────────────────────────────────────────
const otpAttempts   = new Map();
const loginAttempts = new Map();

function checkOtpLimit(key) {
  const now = Date.now();
  const e = otpAttempts.get(key) || { count:0, firstAt:now };
  if (now - e.firstAt > 3600000) { otpAttempts.set(key,{count:1,firstAt:now}); return true; }
  if (e.count >= 5) return false;
  otpAttempts.set(key,{count:e.count+1,firstAt:e.firstAt});
  return true;
}
function checkLoginLimit(ip) {
  const now = Date.now();
  const e = loginAttempts.get(ip) || { count:0, firstAt:now };
  if (now - e.firstAt > 900000) { loginAttempts.set(ip,{count:1,firstAt:now}); return true; }
  if (e.count >= 10) return false;
  loginAttempts.set(ip,{count:e.count+1,firstAt:e.firstAt});
  return true;
}
function resetLoginLimit(ip) { loginAttempts.delete(ip); }
setInterval(()=>{
  const now=Date.now();
  for(const[k,v]of otpAttempts)   if(now-v.firstAt>3600000) otpAttempts.delete(k);
  for(const[k,v]of loginAttempts) if(now-v.firstAt>900000)  loginAttempts.delete(k);
},3600000);

// ── تسجيل ────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword, name, fp } = req.body;
    if (!email||!password||!name)    return res.json({success:false,message:'جميع الحقول مطلوبة'});
    if (!isEmail(email))             return res.json({success:false,message:'صيغة البريد الإلكتروني غير صحيحة'});
    if (password !== confirmPassword) return res.json({success:false,message:'كلمة السر غير متطابقة'});
    if (password.length < 6)         return res.json({success:false,message:'كلمة السر 6 أحرف على الأقل'});
    const norm = normEmail(email);
    if (!checkOtpLimit(norm)) return res.json({success:false,message:'تجاوزت الحد المسموح، حاول بعد ساعة'});
    const ipH = saltHash(getIP(req));
    const fpH = fp || saltHash(getIP(req)+(req.headers['user-agent']||''));
    if (db.prepare('SELECT id FROM devices WHERE ip_hash=? OR fp=?').get(ipH,fpH))
      return res.json({success:false,message:'لا يمكن إنشاء أكثر من حساب من نفس الجهاز'});
    if (db.prepare('SELECT id FROM users WHERE email=?').get(norm))
      return res.json({success:false,message:'هذا البريد مسجل مسبقاً'});
    const otp = genOTP();
    const exp = new Date(Date.now()+10*60*1000).toISOString();
    db.prepare('DELETE FROM otp_codes WHERE email=? AND type=?').run(norm,'register');
    db.prepare('INSERT INTO otp_codes(email,code,type,expires_at) VALUES(?,?,?,?)').run(norm,otp,'register',exp);
    req.session.pendingReg = {email:norm,password,name,ipH,fpH};
    const result = await sendOTPEmail(norm, otp, name);
    if (!result.success && !result.dev)
      return res.json({success:false,message:'فشل إرسال البريد، تحقق من الإيميل وحاول مرة أخرى'});
    const devPayload = process.env.EMAIL_DEV_MODE==='true' ? {otp_dev:otp} : {};
    res.json({success:true,message:'تم إرسال رمز التحقق إلى بريدك الإلكتروني',...devPayload});
  } catch(e){ res.json({success:false,message:'خطأ: '+e.message}); }
});

// ── تأكيد OTP التسجيل ────────────────────────────────────
router.post('/verify-otp', (req, res) => {
  try {
    const { otp } = req.body;
    const p = req.session.pendingReg;
    if (!p) return res.json({success:false,message:'انتهت الجلسة، أعد التسجيل'});
    const rec = db.prepare('SELECT * FROM otp_codes WHERE email=? AND code=? AND type=? AND used=0').get(p.email,otp,'register');
    if (!rec) return res.json({success:false,message:'رمز التحقق خاطئ'});
    if (new Date()>new Date(rec.expires_at)) return res.json({success:false,message:'انتهت صلاحية الرمز'});
    db.prepare('UPDATE otp_codes SET used=1 WHERE id=?').run(rec.id);
    const hash = bcrypt.hashSync(p.password,10);
    const trialEnd = new Date(Date.now()+15*24*3600*1000).toISOString();
    const r = db.prepare('INSERT INTO users(email,password,name,ip_hash,device_fp,trial_end,sub_type) VALUES(?,?,?,?,?,?,?)')
                .run(p.email,hash,p.name,p.ipH,p.fpH,trialEnd,'trial');
    db.prepare('INSERT INTO devices(ip_hash,fp,user_id) VALUES(?,?,?)').run(p.ipH,p.fpH,r.lastInsertRowid);
    req.session.userId = r.lastInsertRowid;
    req.session.pendingReg = null;
    res.json({success:true,message:'تم إنشاء الحساب بنجاح! فترة تجريبية 15 يوم'});
  } catch(e){ res.json({success:false,message:'خطأ: '+e.message}); }
});

// ── دخول ─────────────────────────────────────────────────
router.post('/login', (req, res) => {
  try {
    const ip = getIP(req);
    if (!checkLoginLimit(ip)) return res.json({success:false,message:'محاولات كثيرة، انتظر 15 دقيقة'});
    const { email, password } = req.body;
    const norm = normEmail(email||'');
    const user = db.prepare('SELECT * FROM users WHERE email=?').get(norm);
    if (!user||!bcrypt.compareSync(password||'',user.password))
      return res.json({success:false,message:'البريد الإلكتروني أو كلمة السر خاطئة'});
    resetLoginLimit(ip);
    req.session.userId = user.id;
    const now=new Date(),te=new Date(user.trial_end),se=user.sub_end?new Date(user.sub_end):null;
    const expired = now>te&&(!se||now>se);
    res.json({success:true,expired,name:user.name});
  } catch(e){ res.json({success:false,message:'خطأ'}); }
});

// ── نسيت كلمة السر — إرسال رمز ──────────────────────────
router.post('/forgot-password', async (req, res) => {
  try {
    const norm = normEmail(req.body.email||'');
    if (!isEmail(norm)) return res.json({success:false,message:'بريد إلكتروني غير صحيح'});
    if (!checkOtpLimit('rst_'+norm)) return res.json({success:false,message:'تجاوزت الحد المسموح، حاول بعد ساعة'});
    const user = db.prepare('SELECT id,name FROM users WHERE email=?').get(norm);
    // نرجع نجاح دائماً لأمان (لا نكشف إذا كان البريد مسجل أو لا)
    if (!user) return res.json({success:true,message:'إذا كان البريد مسجلاً، ستصله رسالة'});
    const otp = genOTP();
    const exp = new Date(Date.now()+10*60*1000).toISOString();
    db.prepare('DELETE FROM otp_codes WHERE email=? AND type=?').run(norm,'reset');
    db.prepare('INSERT INTO otp_codes(email,code,type,expires_at) VALUES(?,?,?,?)').run(norm,otp,'reset',exp);
    req.session.pendingReset = {email:norm};
    const result = await sendResetEmail(norm, otp, user.name);
    if (!result.success && !result.dev)
      return res.json({success:false,message:'فشل إرسال البريد، حاول مرة أخرى'});
    const devPayload = process.env.EMAIL_DEV_MODE==='true' ? {otp_dev:otp} : {};
    res.json({success:true,message:'تم إرسال رمز إعادة التعيين إلى بريدك',...devPayload});
  } catch(e){ res.json({success:false,message:'خطأ: '+e.message}); }
});

// ── تأكيد رمز إعادة التعيين ──────────────────────────────
router.post('/verify-reset', (req, res) => {
  try {
    const { otp } = req.body;
    const p = req.session.pendingReset;
    if (!p) return res.json({success:false,message:'انتهت الجلسة، أعد الطلب'});
    const rec = db.prepare('SELECT * FROM otp_codes WHERE email=? AND code=? AND type=? AND used=0').get(p.email,otp,'reset');
    if (!rec) return res.json({success:false,message:'رمز التحقق خاطئ'});
    if (new Date()>new Date(rec.expires_at)) return res.json({success:false,message:'انتهت صلاحية الرمز'});
    db.prepare('UPDATE otp_codes SET used=1 WHERE id=?').run(rec.id);
    req.session.pendingReset.verified = true;
    res.json({success:true,message:'الرمز صحيح، أدخل كلمة السر الجديدة'});
  } catch(e){ res.json({success:false,message:'خطأ: '+e.message}); }
});

// ── تعيين كلمة السر الجديدة ──────────────────────────────
router.post('/reset-password', (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const p = req.session.pendingReset;
    if (!p||!p.verified) return res.json({success:false,message:'يجب تأكيد الرمز أولاً'});
    if (!password||password!==confirmPassword) return res.json({success:false,message:'كلمة السر غير متطابقة'});
    if (password.length<6) return res.json({success:false,message:'كلمة السر 6 أحرف على الأقل'});
    const hash = bcrypt.hashSync(password,10);
    db.prepare('UPDATE users SET password=? WHERE email=?').run(hash,p.email);
    req.session.pendingReset = null;
    res.json({success:true,message:'✅ تم تغيير كلمة السر بنجاح، يمكنك الدخول الآن'});
  } catch(e){ res.json({success:false,message:'خطأ: '+e.message}); }
});

// ── تفعيل ─────────────────────────────────────────────────
router.post('/activate', (req, res) => {
  if (!req.session.userId) return res.json({success:false,message:'سجّل دخولك أولاً'});
  try {
    const code = (req.body.code||'').trim().toUpperCase();
    const act = db.prepare('SELECT * FROM activation_codes WHERE code=? AND used=0').get(code);
    if (!act) return res.json({success:false,message:'الرمز غير صحيح أو مستخدم مسبقاً'});
    const now=new Date();
    const user=db.prepare('SELECT * FROM users WHERE id=?').get(req.session.userId);
    const base=(user.sub_end&&new Date(user.sub_end)>now)?new Date(user.sub_end):now;
    const newEnd=new Date(base.getTime()+act.days*86400000);
    db.prepare('UPDATE users SET sub_end=?,sub_type=? WHERE id=?').run(newEnd.toISOString(),act.type,req.session.userId);
    db.prepare('UPDATE activation_codes SET used=1,used_by=?,used_at=CURRENT_TIMESTAMP WHERE id=?').run(req.session.userId,act.id);
    res.json({success:true,message:`✅ تم التفعيل! صالح حتى ${newEnd.toLocaleDateString('ar-DZ')}`,endDate:newEnd});
  } catch(e){ res.json({success:false,message:'خطأ'}); }
});

// ── معلومات الجلسة ────────────────────────────────────────
router.get('/me', (req, res) => {
  if (!req.session.userId) return res.json({loggedIn:false});
  const u = db.prepare('SELECT id,email,name,trial_end,sub_end,sub_type FROM users WHERE id=?').get(req.session.userId);
  if (!u) return res.json({loggedIn:false});
  const now=new Date(),te=new Date(u.trial_end),se=u.sub_end?new Date(u.sub_end):null;
  const activeEnd=(se&&se>te)?se:te;
  const expired=now>activeEnd;
  const daysLeft=expired?0:Math.ceil((activeEnd-now)/86400000);
  res.json({loggedIn:true,...u,expired,daysLeft});
});

// ── خروج ──────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  req.session.destroy(()=>res.json({success:true}));
});

module.exports = router;
