'use strict';
const tpls = require('./templates');

const v = (x, fb='___________') => (x && String(x).trim()) ? String(x).trim() : fb;
const fmtDate = d => {
  if (!d) return today();
  try {
    const dt = new Date(d);
    const M = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    return `${dt.getDate()} ${M[dt.getMonth()]} ${dt.getFullYear()}`;
  } catch(e) { return String(d); }
};
const today = () => fmtDate(new Date().toISOString());

// ── قالب HTML أساسي لكل الوثائق الرسمية ──────────────────
function shell(title, body, city, date) {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Amiri',serif;font-size:14pt;line-height:2.2;color:#000;background:#fff;padding:20mm 25mm;direction:rtl}
.hdr{text-align:center;border-bottom:3px double #000;padding-bottom:10px;margin-bottom:20px}
.bismillah{font-size:17pt;font-weight:700}
.republic{font-size:13pt;font-weight:700;margin-top:4px}
h1{text-align:center;font-size:18pt;font-weight:700;text-decoration:underline;text-underline-offset:6px;margin:18px 0 22px}
p{margin:8px 0;text-align:justify}
.indent{text-indent:30px}
.bold{font-weight:700}
.ul{text-decoration:underline}
.center{text-align:center}
.art{font-weight:700;text-decoration:underline}
table{width:100%;border-collapse:collapse;margin:16px 0;font-family:'Cairo',sans-serif;font-size:11pt}
th{background:#1A2A4A;color:#fff;padding:10px 14px;text-align:right}
td{padding:8px 12px;border:1px solid #999}
tr:nth-child(even) td{background:#f9f9f9}
.total-row td{font-weight:700;font-size:12pt;background:#eee}
.sigs{display:flex;justify-content:space-between;margin-top:55px}
.sig{text-align:center;width:44%}
.sig-line{border-bottom:1px solid #000;width:80%;margin:32px auto 6px}
.sig-lbl{font-size:11pt;color:#555}
@media print{body{padding:15mm 20mm}@page{size:A4;margin:0}}
</style>
</head>
<body>
<div class="hdr">
  <div class="bismillah">بسم الله الرحمن الرحيم</div>
  <div class="republic">الجمهورية الجزائرية الديمقراطية الشعبية</div>
</div>
<h1>${title}</h1>
${body}
<div class="sigs">
  <div class="sig">
    <p>التوقيع والبصمة</p>
    <div class="sig-line"></div>
    <div class="sig-lbl">الإمضاء</div>
  </div>
  <div class="sig">
    <p>${v(city,'في')}، بتاريخ: ${fmtDate(date)||today()}</p>
    <div class="sig-line"></div>
    <div class="sig-lbl">التاريخ والمكان</div>
  </div>
</div>
</body></html>`;
}

// ══════════════════════════════════════════════════════════
//  مولّدات خاصة للوثائق ذات الشكل المميز
// ══════════════════════════════════════════════════════════

// ── السيرة الذاتية ─────────────────────────────────────
function gen_cv(d) {
  const skills = (d.skills||'العمل الجماعي\nالتواصل الفعّال\nإتقان الحاسوب').split('\n').filter(s=>s.trim());
  const langs  = (d.languages||'العربية: ممتاز\nالفرنسية: جيد').split('\n').filter(l=>l.trim());
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Cairo',sans-serif;background:#fff;color:#111;direction:rtl;font-size:10pt}
.wrap{display:flex;min-height:297mm}
.side{width:220px;background:#1A2A4A;color:#fff;padding:28px 18px;flex-shrink:0}
.main{flex:1;padding:28px 22px}
.avatar{width:88px;height:88px;border-radius:50%;background:rgba(201,168,76,0.2);border:3px solid #C9A84C;display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 14px}
.name{font-size:15pt;font-weight:900;color:#E8C97A;text-align:center;line-height:1.3}
.job{font-size:9pt;color:#aac4e8;text-align:center;margin:4px 0 18px}
.side-sec{margin-bottom:18px}
.side-title{font-size:8.5pt;font-weight:700;color:#C9A84C;border-bottom:1px solid rgba(201,168,76,0.4);padding-bottom:3px;margin-bottom:8px;letter-spacing:1px}
.info{font-size:8.5pt;color:#d0dae8;margin-bottom:5px;line-height:1.5;word-break:break-word}
.skill-bar{background:rgba(255,255,255,0.1);border-radius:4px;height:5px;margin-top:2px}
.skill-fill{background:linear-gradient(90deg,#C9A84C,#E8C97A);height:100%;border-radius:4px}
.main-title{font-size:11pt;font-weight:700;color:#1A2A4A;border-bottom:2px solid #1A2A4A;padding-bottom:4px;margin-bottom:10px;margin-top:18px}
.main-title:first-of-type{margin-top:0}
.exp{margin-bottom:12px;padding-bottom:10px;border-bottom:1px dashed #eee}
.exp-title{font-size:10pt;font-weight:700}
.exp-sub{font-size:9pt;color:#555;margin:1px 0}
.exp-desc{font-size:9pt;color:#333;line-height:1.6;margin-top:3px}
.profile{font-size:9.5pt;color:#333;line-height:1.8}
@media print{@page{size:A4;margin:0}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="wrap">
<div class="side">
  <div class="avatar">👤</div>
  <div class="name">${v(d.fullName)}</div>
  <div class="job">${v(d.jobTitle,'باحث عن عمل')}</div>
  <div class="side-sec">
    <div class="side-title">معلومات التواصل</div>
    <div class="info">📞 ${v(d.phone)}</div>
    ${d.email?`<div class="info">📧 ${d.email}</div>`:''}
    <div class="info">📍 ${v(d.address)}</div>
    ${d.birthDate?`<div class="info">🎂 ${fmtDate(d.birthDate)}</div>`:''}
    ${d.status?`<div class="info">💍 ${d.status}</div>`:''}
    ${d.nationalId?`<div class="info">🪪 ${d.nationalId}</div>`:''}
  </div>
  <div class="side-sec">
    <div class="side-title">المهارات</div>
    ${skills.map((s,i)=>`<div style="margin-bottom:7px"><div class="info">${s}</div><div class="skill-bar"><div class="skill-fill" style="width:${95-i*8}%"></div></div></div>`).join('')}
  </div>
  <div class="side-sec">
    <div class="side-title">اللغات</div>
    ${langs.map(l=>`<div class="info">• ${l}</div>`).join('')}
  </div>
  ${d.certifications?`<div class="side-sec"><div class="side-title">شهادات ودورات</div>${d.certifications.split('\n').filter(c=>c.trim()).map(c=>`<div class="info">• ${c}</div>`).join('')}</div>`:''}
</div>
<div class="main">
  ${d.summary?`<div class="main-title">الملخص الشخصي</div><div class="profile">${d.summary}</div>`:''}
  <div class="main-title">المسار الدراسي</div>
  ${d.degree?`<div class="exp"><div class="exp-title">${v(d.degree)}</div><div class="exp-sub">${v(d.school)} ${d.gradYear?'— '+d.gradYear:''}</div>${d.specialty?`<div class="exp-desc">تخصص: ${d.specialty}</div>`:''}</div>`:''}
  ${(d.education||'').split('||').filter(e=>e.trim()).map(e=>{const[a,b,c,de]=(e+'||||').split('|');return`<div class="exp"><div class="exp-title">${a}</div><div class="exp-sub">${b} ${c?'— '+c:''}</div>${de?`<div class="exp-desc">${de}</div>`:''}</div>`}).join('')}
  <div class="main-title">الخبرة المهنية</div>
  ${(d.experience||'').split('||').filter(e=>e.trim()).map(e=>{const[a,b,c,de]=(e+'||||').split('|');return`<div class="exp"><div class="exp-title">${a}</div><div class="exp-sub">${b} ${c?'| '+c:''}</div>${de?`<div class="exp-desc">${de}</div>`:''}</div>`}).join('')||'<div class="exp-desc" style="color:#888">لا توجد خبرة مهنية سابقة</div>'}
</div>
</div></body></html>`;
}

// ── الفاتورة ────────────────────────────────────────────
function gen_invoice(d) {
  const rows = (d.items||'').split('\n').filter(i=>i.trim()).map(i=>{
    const [desc,qty,price] = (i+'||').split('|');
    const total = (parseFloat(qty)||1)*(parseFloat(price)||0);
    return {desc:desc||'',qty:qty||'1',price:price||'0',total};
  });
  const sub = rows.reduce((s,r)=>s+r.total,0);
  const tva = d.tva ? sub*(parseFloat(d.tva)/100) : 0;
  const grand = sub + tva;
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Cairo',sans-serif;padding:18mm 22mm;color:#000;background:#fff;direction:rtl;font-size:10.5pt}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1A2A4A;padding-bottom:14px;margin-bottom:22px}
.inv-title{font-size:26pt;font-weight:900;color:#1A2A4A}
.inv-meta{font-size:9.5pt;color:#555;margin-top:4px}
.company-name{font-size:13pt;font-weight:700}
.company-info{font-size:9pt;color:#555;margin-top:4px}
.client-box{background:#f7f7f7;border:1px solid #ddd;border-radius:6px;padding:12px 16px;margin-bottom:20px}
table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:10pt}
th{background:#1A2A4A;color:#fff;padding:10px 13px;text-align:right}
td{padding:9px 13px;border:1px solid #ccc}
tr:nth-child(even) td{background:#f9f9f9}
.totals{display:flex;justify-content:flex-end}
.totals-box{width:300px}
.totals-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #eee;font-size:10pt}
.grand-row{font-size:12pt;font-weight:900;color:#1A2A4A;border-top:2px solid #1A2A4A;padding-top:8px;margin-top:4px}
.notes{margin-top:20px;padding:12px;background:#fffde7;border:1px solid #ffe082;border-radius:6px;font-size:9.5pt}
@media print{@page{size:A4;margin:0}body{padding:14mm 18mm}}
</style></head><body>
<div class="hdr">
  <div>
    <div class="inv-title">فاتورة</div>
    <div class="inv-meta">رقم: <b>${v(d.invoiceNum,'001')}</b></div>
    <div class="inv-meta">التاريخ: ${fmtDate(d.date)}</div>
  </div>
  <div style="text-align:left">
    <div class="company-name">${v(d.companyName)}</div>
    <div class="company-info">${v(d.companyAddress,'')}</div>
    ${d.rc?`<div class="company-info">RC: ${d.rc}</div>`:''}
    ${d.nif?`<div class="company-info">NIF: ${d.nif}</div>`:''}
    ${d.phone?`<div class="company-info">📞 ${d.phone}</div>`:''}
  </div>
</div>
<div class="client-box">
  <b>فاتورة موجهة إلى:</b> ${v(d.clientName)}<br/>
  ${d.clientAddress?`<b>العنوان:</b> ${d.clientAddress}`:''}
</div>
<table>
  <tr><th>البيان</th><th>الكمية</th><th>سعر الوحدة (دج)</th><th>المجموع (دج)</th></tr>
  ${rows.map(r=>`<tr><td>${r.desc}</td><td style="text-align:center">${r.qty}</td><td>${parseFloat(r.price).toLocaleString('ar-DZ')}</td><td><b>${r.total.toLocaleString('ar-DZ')}</b></td></tr>`).join('')}
</table>
<div class="totals">
  <div class="totals-box">
    <div class="totals-row"><span>المجموع الجزئي</span><span>${sub.toLocaleString('ar-DZ')} دج</span></div>
    ${tva?`<div class="totals-row"><span>TVA (${d.tva}%)</span><span>${tva.toLocaleString('ar-DZ')} دج</span></div>`:''}
    <div class="totals-row grand-row"><span>المجموع الكلي</span><span>${grand.toLocaleString('ar-DZ')} دج</span></div>
  </div>
</div>
${d.notes?`<div class="notes"><b>ملاحظات:</b> ${d.notes}</div>`:''}
</body></html>`;
}

// ── عقد إيجار ─────────────────────────────────────────
function gen_rental(d, title) {
  return shell(title||'عقد إيجار سكني', `
<p class="indent">إنه في يوم <b>${fmtDate(d.contractDate||d.date)}</b> بمدينة <b>${v(d.city)}</b>، تمّ إبرام هذا العقد بين:</p>
<p><span class="bold">الطرف الأول (المؤجِّر):</span> السيد/ة <span class="ul bold">${v(d.ownerName)}</span>، رقم التعريف الوطني: ${v(d.ownerNID)}، المقيم بـ: ${v(d.ownerAddress)}.</p>
<p><span class="bold">الطرف الثاني (المستأجر):</span> السيد/ة <span class="ul bold">${v(d.tenantName)}</span>، رقم التعريف الوطني: ${v(d.tenantNID)}، المقيم بـ: ${v(d.tenantAddress)}.</p>
<p class="center bold" style="margin:14px 0">اتُّفق على الشروط التالية:</p>
<p><span class="art">المادة 01 — موضوع العقد:</span> يؤجِّر المؤجِّر للمستأجر المسكن الكائن بـ: <span class="ul">${v(d.propertyAddress)}</span>، ولاية: ${v(d.wilaya)}، يتكوّن من <span class="ul">${v(d.rooms)}</span> غرف، الطابق: ${v(d.floor,'الأرضي')}.</p>
<p><span class="art">المادة 02 — المدة:</span> من <span class="ul">${fmtDate(d.startDate)}</span> إلى <span class="ul">${fmtDate(d.endDate)}</span> (${v(d.duration,'سنة كاملة')})، قابلة للتجديد.</p>
<p><span class="art">المادة 03 — الإيجار:</span> حُدِّد بـ <span class="bold ul">${v(d.rent)} دج/شهر</span>، يُدفع في مطلع كل شهر.</p>
<p><span class="art">المادة 04 — الضمان:</span> ${v(d.deposit,'شهر إيجار')} يُستردّ عند نهاية العقد شريطة سلامة المسكن.</p>
<p><span class="art">المادة 05 — الالتزامات:</span> يلتزم المستأجر بالمحافظة على المسكن وعدم التنازل عن الإيجار دون إذن كتابي.</p>
<p><span class="art">المادة 06 — الإنهاء:</span> إشعار مسبق ثلاثة أشهر طبقاً للتشريع الجزائري.</p>
<p>حُرِّر في نسختين أصليتين.</p>`, d.city, d.contractDate||d.date);
}

// ── طلب التحاق عسكري/أمني ─────────────────────────────
function gen_military(d, tpl) {
  return shell(tpl.title, `
<p><span class="bold">إلى: ${v(d.dest||tpl.dest||'السيد المدير العام')}</span></p>
<br/>
<p class="indent">يشرفني أن أتقدم إليكم بطلب الالتحاق بـ <b>${v(tpl.service)}</b>، وأرجو التفضل بدراسة ملفي والنظر في قبولي.</p>
<p><b>البيانات الشخصية:</b></p>
<p>الاسم واللقب: <span class="ul bold">${v(d.fullName)}</span></p>
<p>رقم التعريف الوطني: <span class="ul">${v(d.nid)}</span></p>
<p>تاريخ ومكان الميلاد: <span class="ul">${fmtDate(d.birthDate)}</span> بـ <span class="ul">${v(d.birthPlace)}</span></p>
<p>العنوان: <span class="ul">${v(d.address)}</span></p>
<p>الهاتف: <span class="ul">${v(d.phone)}</span></p>
<p>الحالة الاجتماعية: <span class="ul">${v(d.status,'أعزب')}</span></p>
<p>المستوى الدراسي: <span class="ul">${v(d.level)}</span></p>
${d.specialty?`<p>التخصص: <span class="ul">${d.specialty}</span></p>`:''}
${d.height?`<p>الطول: ${d.height} سم — الوزن: ${d.weight||'---'} كغ</p>`:''}
${d.military_service?`<p>الخدمة الوطنية: <span class="ul">${d.military_service}</span></p>`:''}
${d.motivation?`<br/><p class="bold">دوافع الالتحاق:</p><p class="indent">${d.motivation}</p>`:''}
${d.previous_service?`<br/><p class="bold">الخدمات السابقة:</p><p class="indent">${d.previous_service}</p>`:''}
<br/>
<p class="indent">وإنني إذ أتقدم بهذا الطلب، أُعلن استعدادي التام للخضوع لجميع الاختبارات والمعاينات الطبية والنفسية والبدنية المقررة، وأتعهد بصحة جميع المعلومات الواردة أعلاه.</p>
<p class="indent">آمل أن يلقى هذا الطلب العناية اللازمة، مع خالص الاحترام والتقدير.</p>`, d.city, d.date);
}

// ── طلب إداري عام ─────────────────────────────────────
function gen_admin(d, title) {
  return shell(title, `
<p><span class="bold">إلى: ${v(d.authority,'السيد/ة المسؤول المختص')}</span></p>
<br/>
<p><span class="bold">الموضوع:</span> ${v(d.subject)}</p>
<br/>
<p>أنا الموقع أدناه:</p>
<p>الاسم واللقب: <span class="ul bold">${v(d.fullName)}</span></p>
<p>رقم التعريف الوطني: <span class="ul">${v(d.nid)}</span></p>
<p>تاريخ ومكان الميلاد: <span class="ul">${fmtDate(d.birthDate)}</span> بـ <span class="ul">${v(d.birthPlace)}</span></p>
<p>العنوان: <span class="ul">${v(d.address)}</span></p>
<p>الهاتف: <span class="ul">${v(d.phone)}</span></p>
<br/>
<p class="indent">${v(d.content)}</p>
${d.attachments?`<br/><p><b>الوثائق المرفقة:</b></p><p>${d.attachments}</p>`:''}
<br/>
<p class="indent">وعليه، أرجو من سيادتكم النظر في طلبي والبتّ فيه في أقرب الآجال، مع خالص الشكر والتقدير.</p>`, d.city, d.date);
}

// ── شكوى ─────────────────────────────────────────────
function gen_complaint(d, title) {
  return shell(title, `
<p><span class="bold">إلى: ${v(d.authority,'السيد/ة المسؤول المختص')}</span></p>
<br/>
<p><span class="bold">الموضوع:</span> شكوى بخصوص ${v(d.subject)}</p>
<br/>
<p>أنا الموقع أدناه: <span class="ul bold">${v(d.fullName)}</span>، رقم التعريف الوطني: ${v(d.nid)}، المقيم بـ: ${v(d.address)}، الهاتف: ${v(d.phone)}.</p>
<br/>
<p class="bold">وقائع الشكوى:</p>
<p class="indent">${v(d.facts)}</p>
<br/>
<p class="bold">ما أطلبه:</p>
<p class="indent">${v(d.request,'اتخاذ الإجراءات القانونية اللازمة وإعلامي بالنتيجة في أقرب الآجال.')}</p>
<br/>
<p class="indent">آمل من سيادتكم إيلاء هذه الشكوى العناية اللازمة، وتفضلوا بقبول فائق الاحترام.</p>`, d.city, d.date);
}

// ── عقد عمل ──────────────────────────────────────────
function gen_contract(d, title) {
  return shell(title, `
<p>بين: <span class="bold">مؤسسة ${v(d.company)}</span>، السجل التجاري: ${v(d.rc,'—')}, ممثلةً بالسيد: <span class="ul">${v(d.managerName)}</span> (يُدعى صاحب العمل).</p>
<p>وبين: السيد/ة <span class="ul bold">${v(d.employeeName)}</span>، رقم التعريف الوطني: ${v(d.employeeNID)}، المقيم بـ: ${v(d.employeeAddress,'—')} (يُدعى العامل).</p>
<p class="center bold" style="margin:12px 0">اتُّفق على ما يلي:</p>
<p><span class="art">المادة 01 — التعيين:</span> يُعيَّن العامل في منصب <span class="ul bold">${v(d.position)}</span> اعتباراً من <span class="ul">${fmtDate(d.startDate)}</span>.</p>
<p><span class="art">المادة 02 — طبيعة العقد:</span> ${title}${d.duration?` لمدة ${d.duration}`:''}.${d.trialPeriod?` فترة تجربة: ${d.trialPeriod}.`:''}</p>
<p><span class="art">المادة 03 — الأجر:</span> الراتب الشهري الأساسي <span class="ul bold">${v(d.salary)} دج</span>.</p>
<p><span class="art">المادة 04 — وقت العمل:</span> ${v(d.hours,'8 ساعات يومياً')} وفق التشريع الجزائري.</p>
<p><span class="art">المادة 05 — الإجازات:</span> يستفيد العامل من حقه في الإجازة السنوية وفق القانون 90-11.</p>
<p><span class="art">المادة 06 — الإنهاء:</span> لا يمكن إنهاء العقد إلا وفق قانون علاقات العمل الجزائري النافذ.</p>
<p>حُرِّر في نسختين أصليتين.</p>`, d.city, d.date);
}

// ── وصل إيجار ─────────────────────────────────────────
function gen_rent_receipt(d) {
  return shell('وصل استلام الإيجار', `
<p>أنا الموقع أدناه: <span class="ul bold">${v(d.ownerName)}</span> (المالك)،</p>
<p>أُقِرّ باستلامي من المستأجر السيد/ة: <span class="ul bold">${v(d.tenantName)}</span>،</p>
<p>مبلغ إيجار شهر: <span class="ul bold">${v(d.month)}</span>، قدره: <span class="bold ul">${v(d.amount)} دينار جزائري (${v(d.amountText)})</span>،</p>
<p>وذلك مقابل سكن: ${v(d.propertyAddress)}.</p>
<p>وهذا الوصل دليل الاستلام.</p>`, d.city, d.date);
}

// ── وصل مالي ──────────────────────────────────────────
function gen_money_receipt(d) {
  return shell('وصل استلام مبلغ مالي', `
<p>أنا الموقع أدناه: <span class="ul bold">${v(d.receiverName)}</span>، رقم التعريف الوطني: ${v(d.receiverNID,'—')},</p>
<p>أُقِرّ باستلامي من السيد/ة: <span class="ul bold">${v(d.payerName)}</span>، رقم التعريف الوطني: ${v(d.payerNID,'—')},</p>
<p>مبلغاً مالياً قدره: <span class="bold ul">${v(d.amount)} دينار جزائري (${v(d.amountText)})</span>،</p>
<p>وذلك مقابل: <span class="bold">${v(d.reason)}</span>.</p>
<p>وقد استلمتُ هذا المبلغ كاملاً دون أي تحفظ.</p>`, d.city, d.date);
}

// ── تصريح شرفي ────────────────────────────────────────
function gen_honor(d) {
  return shell('تصريح شرفي', `
<p>أنا الموقع أدناه:</p>
<p>الاسم واللقب: <span class="ul bold">${v(d.fullName)}</span></p>
<p>رقم التعريف الوطني: <span class="ul">${v(d.nid)}</span></p>
<p>تاريخ ومكان الميلاد: ${fmtDate(d.birthDate)} بـ ${v(d.birthPlace)}</p>
<p>العنوان: <span class="ul">${v(d.address)}</span></p>
<br/>
<p class="indent">أُصرِّح شرفاً وعلى مسؤوليتي الكاملة بأن:</p>
<p class="bold indent">${v(d.content)}</p>
<br/>
<p class="indent">وأُقِرّ بعلمي التام بالمسؤولية القانونية الناجمة عن أي تصريح كاذب طبقاً للتشريع الجزائري.</p>
<p class="indent">حُرِّر لاستعماله ${v(d.purpose,'فيما يلزم')}.</p>`, d.city, d.date);
}

// ── عقد بيع سيارة ─────────────────────────────────────
function gen_car_sale(d) {
  return shell('عقد بيع سيارة', `
<p>بين البائع: <span class="ul bold">${v(d.sellerName)}</span>، رقم التعريف الوطني: ${v(d.sellerNID)}</p>
<p>والمشتري: <span class="ul bold">${v(d.buyerName)}</span>، رقم التعريف الوطني: ${v(d.buyerNID)}</p>
<br/>
<p class="center bold" style="margin:12px 0">اتُّفق على ما يلي:</p>
<p><span class="art">الفصل 01 — المركبة:</span></p>
<p>الماركة: <b>${v(d.brand)}</b> — الطراز: <b>${v(d.model)}</b> — سنة الصنع: <b>${v(d.year)}</b></p>
<p>رقم الهيكل: <span class="ul">${v(d.chassis)}</span> — رقم اللوحة: <span class="ul">${v(d.plate)}</span></p>
<p>الحالة: ${v(d.condition,'جيدة')}</p>
<p><span class="art">الفصل 02 — الثمن:</span> حُدِّد ثمن البيع بـ <span class="bold ul">${v(d.price)} دينار جزائري (${v(d.priceText,'—')})</span>، مدفوع كاملاً نقداً.</p>
<p><span class="art">الفصل 03 — نقل الملكية:</span> تنتقل ملكية المركبة إلى المشتري اعتباراً من تاريخ توقيع هذا العقد.</p>
<p><span class="art">الفصل 04 — الضمان:</span> يُقرّ البائع بأن المركبة خالية من أي رهن أو نزاع قانوني.</p>
<p>حُرِّر في نسختين أصليتين.</p>`, d.city, d.date);
}

// ── طلب قرض ────────────────────────────────────────────
function gen_loan(d) {
  return shell('طلب قرض بنكي', `
<p><span class="bold">إلى: إدارة بنك ${v(d.bankName)}، فرع: ${v(d.branch,'—')}</span></p>
<br/>
<p><span class="bold">الموضوع: طلب قرض بنكي</span></p>
<br/>
<p>أنا الموقع أدناه: <span class="ul bold">${v(d.fullName)}</span>، رقم التعريف الوطني: ${v(d.nid)}، المقيم بـ: ${v(d.address)}،</p>
${d.employer?`<p>العامل لدى: <b>${d.employer}</b> في منصب: <b>${v(d.position,'—')}</b>، الراتب الشهري: <b>${v(d.salary,'—')} دج</b>.</p>`:''}
<br/>
<p class="indent">أتقدم بطلبي للحصول على قرض بنكي بمبلغ: <span class="bold ul">${v(d.amount)} دينار جزائري (${v(d.amountText)})</span>.</p>
<p>الغرض من القرض: <b>${v(d.purpose)}</b>.</p>
${d.duration?`<p>مدة السداد المقترحة: <b>${d.duration} شهراً</b>.</p>`:''}
<br/>
<p class="indent">وأتعهد بتقديم جميع الوثائق الداعمة وبسداد الأقساط في آجالها المحددة.</p>
<p class="indent">أرجو الموافقة على طلبي مع خالص الشكر والتقدير.</p>`, d.city, d.date);
}

// ── محضر اجتماع ────────────────────────────────────────
function gen_minutes(d) {
  return shell('محضر اجتماع', `
<p><span class="bold">المؤسسة:</span> ${v(d.institution)}</p>
<p><span class="bold">تاريخ الاجتماع:</span> ${fmtDate(d.meetingDate)}</p>
<p><span class="bold">مكان الانعقاد:</span> ${v(d.city)}</p>
<br/>
<p class="bold">الحاضرون:</p>
<p>${v(d.attendees)}</p>
<br/>
<p class="bold">جدول الأعمال:</p>
<p>${v(d.agenda)}</p>
<br/>
<p class="bold">القرارات المتخذة:</p>
<p>${v(d.decisions)}</p>
<br/>
<p class="indent">وقد انتهى الاجتماع على الساعة، وحُرِّر هذا المحضر ووقّع عليه الحاضرون.</p>`, d.city, d.meetingDate);
}

// ── رسالة رسمية عامة ────────────────────────────────────
function gen_letter(d, title) {
  return shell(title, `
<p><span class="bold">إلى: ${v(d.receiverName)}</span></p>
<br/>
<p><span class="bold">الموضوع:</span> ${v(d.subject)}</p>
<br/>
<p class="indent">${v(d.content)}</p>
<br/>
<p class="indent">تفضلوا بقبول فائق الاحترام والتقدير.</p>
<br/>
<p>المُرسِل: ${v(d.senderName)}</p>`, d.city, d.date);
}

// ══════════════════════════════════════════════════════════
//  دالة التوليد الرئيسية
// ══════════════════════════════════════════════════════════
module.exports = function generate(type, d) {
  const tpl = tpls[type];
  if (!tpl) throw new Error('نوع غير معروف: ' + type);
  const title = tpl.title || type;

  // وثائق ذات مولّد خاص
  if (type === 'cv')             return gen_cv(d);
  if (type === 'invoice' || type === 'quote') return gen_invoice(d);
  if (type === 'car_sale_contract' || type === 'car_gift') return gen_car_sale(d);
  if (type === 'loan_request' || type === 'bnl_request')  return gen_loan(d);
  if (type === 'minutes')        return gen_minutes(d);
  if (type === 'rent_receipt')   return gen_rent_receipt(d);
  if (type === 'money_receipt')  return gen_money_receipt(d);
  if (type === 'honor_declaration' || type === 'witness_statement' ||
      type === 'religious_marriage') return gen_honor(d);

  if (['rental_contract','commercial_rental','sublease_contract','roommate_agreement'].includes(type))
    return gen_rental(d, title);

  if (['employment_contract','cdi_contract','internship_contract',
       'part_time_contract','remote_contract','freelance_contract'].includes(type))
    return gen_contract(d, title);

  if (tpl.service) return gen_military(d, tpl); // عسكري/أمني

  // شكاوى
  const complaintTypes = ['admin_complaint','appeal_request','police_complaint','gendarmerie_complaint',
    'complaint_employer','hospital_complaint','pharmacy_complaint','bank_complaint','urban_complaint',
    'noise_complaint','telecom_complaint','arpce_complaint','environment_complaint','water_complaint',
    'electricity_complaint','gas_complaint','waste_complaint','parent_complaint','legal_complaint'];
  if (complaintTypes.includes(type)) return gen_complaint(d, title);

  // رسائل
  const letterTypes = ['official_letter','thank_you_letter','condolence_letter','recommendation_letter',
    'acceptance_letter','rejection_letter','reminder_letter','invitation_letter','acknowledgment',
    'donation_letter','guarantee_letter','bail_letter'];
  if (letterTypes.includes(type)) return gen_letter(d, title);

  // كل الباقي → قالب إداري عام
  return gen_admin(d, title);
};
