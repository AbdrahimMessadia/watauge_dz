// services/email.js — إرسال البريد عبر Gmail SMTP مجاناً
const nodemailer = require('nodemailer');

let _transporter = null;
function getTransporter() {
  if (_transporter) return _transporter;
  _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS }
  });
  return _transporter;
}

function baseTemplate(content) {
  return `<!DOCTYPE html><html dir="rtl" lang="ar">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#04080F;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:rtl">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#04080F;padding:40px 16px">
<tr><td align="center">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%">
  <tr><td align="center" style="padding-bottom:28px">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:linear-gradient(135deg,#C9A84C,#E8C97A);border-radius:12px;width:48px;height:48px;text-align:center;line-height:48px;font-size:22px">📄</td>
      <td style="padding-right:10px;font-size:24px;font-weight:900;color:#E8C97A;vertical-align:middle">وثيقتي</td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#0A1628;border:1px solid rgba(201,168,76,0.22);border-radius:20px;padding:36px 32px">
    ${content}
  </td></tr>
  <tr><td align="center" style="padding-top:24px">
    <p style="margin:0;font-size:11px;color:#3A4A60">© 2025 وثيقتي — منصة الوثائق الرسمية الجزائرية 🇩🇿</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function otpBlock(code, color='#E8C97A', border='rgba(201,168,76,0.4)') {
  return `<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:26px 0">
    <div style="background:rgba(201,168,76,0.07);border:2px solid ${border};border-radius:16px;padding:24px 36px;display:inline-block">
      <p style="margin:0 0 6px;font-size:11px;color:#8A9AB8;letter-spacing:2px">رمز التحقق</p>
      <p style="margin:0;font-size:48px;font-weight:900;color:${color};letter-spacing:10px;font-family:'Courier New',monospace;direction:ltr">${code}</p>
    </div>
  </td></tr></table>`;
}

function warningBlock(msg) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
    <td style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:10px;padding:14px 16px">
      <p style="margin:0;font-size:13px;color:#8A9AB8;line-height:1.8">${msg}</p>
    </td></tr></table>`;
}

async function sendOTPEmail(email, code, name) {
  if (process.env.EMAIL_DEV_MODE === 'true') {
    console.log(`[EMAIL-DEV] إلى ${email} | رمز التسجيل: ${code}`);
    return { success: true, dev: true };
  }
  try {
    await getTransporter().sendMail({
      from: `"وثيقتي 📄" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `${code} — رمز التحقق في وثيقتي`,
      html: baseTemplate(`
        <p style="margin:0 0 6px;font-size:21px;font-weight:700;color:#E8E4D8">مرحباً ${name} 👋</p>
        <p style="margin:0 0 28px;font-size:14px;color:#8A9AB8;line-height:1.8">لإكمال إنشاء حسابك في وثيقتي، استخدم رمز التحقق أدناه:</p>
        ${otpBlock(code)}
        ${warningBlock('⏱️ <b style="color:#E8C97A">الرمز صالح 10 دقائق فقط</b><br/>🔒 لا تشارك هذا الرمز مع أي شخص — فريق وثيقتي لن يطلبه منك أبداً')}
        <p style="margin:0;font-size:12px;color:#3A4A60">إذا لم تطلب هذا، تجاهل هذا البريد بأمان.</p>
      `)
    });
    return { success: true };
  } catch(e) { console.error('[EMAIL]', e.message); return { success: false, error: e.message }; }
}

async function sendResetEmail(email, code, name) {
  if (process.env.EMAIL_DEV_MODE === 'true') {
    console.log(`[EMAIL-DEV RESET] إلى ${email} | رمز إعادة التعيين: ${code}`);
    return { success: true, dev: true };
  }
  try {
    await getTransporter().sendMail({
      from: `"وثيقتي 📄" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `${code} — رمز إعادة تعيين كلمة السر`,
      html: baseTemplate(`
        <p style="margin:0 0 6px;font-size:21px;font-weight:700;color:#E8E4D8">إعادة تعيين كلمة السر 🔑</p>
        <p style="margin:0 0 28px;font-size:14px;color:#8A9AB8;line-height:1.8">مرحباً ${name || ''}، طلبت إعادة تعيين كلمة السر. استخدم الرمز أدناه:</p>
        ${otpBlock(code, '#E74C3C', 'rgba(231,76,60,0.4)')}
        ${warningBlock('⏱️ <b style="color:#E74C3C">الرمز صالح 10 دقائق فقط</b><br/>🔒 إذا لم تطلب هذا، تجاهل البريد — حسابك بأمان')}
        <p style="margin:0;font-size:12px;color:#3A4A60">إذا واجهت مشكلة تواصل معنا.</p>
      `)
    });
    return { success: true };
  } catch(e) { console.error('[EMAIL-RESET]', e.message); return { success: false, error: e.message }; }
}

module.exports = { sendOTPEmail, sendResetEmail };
