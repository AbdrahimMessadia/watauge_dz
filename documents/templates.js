'use strict';
// ─── حقول كل وثيقة ────────────────────────────────────────────
const T = {};

// ── مساعد ─────────────────────
function std(extra=[]) {
  return [...extra, {n:'city',l:'المدينة',t:'text',r:true},{n:'date',l:'التاريخ',t:'date',r:true}];
}
function person(prefix='') {
  return [
    {n:prefix+'fullName',l:'الاسم واللقب',t:'text',r:true},
    {n:prefix+'nid',     l:'رقم التعريف الوطني',t:'text',r:true},
    {n:prefix+'birthDate',l:'تاريخ الميلاد',t:'date'},
    {n:prefix+'birthPlace',l:'مكان الميلاد',t:'text'},
    {n:prefix+'address', l:'العنوان الكامل',t:'text',r:true},
    {n:prefix+'phone',   l:'رقم الهاتف',t:'text'},
  ];
}

// ═══════════════════════════════════════════
// 1. عسكرية وأمنية
// ═══════════════════════════════════════════
const militaryBase = (service, dest) => ({
  title: `طلب الالتحاق بـ${service}`, service, dest,
  fields: std([
    ...person(),
    {n:'status',l:'الحالة الاجتماعية',t:'sel',opts:['أعزب','متزوج','مطلق']},
    {n:'level',l:'المستوى الدراسي',t:'text',r:true},
    {n:'specialty',l:'التخصص / الشعبة',t:'text'},
    {n:'height',l:'الطول (سم)',t:'number'},
    {n:'weight',l:'الوزن (كغ)',t:'number'},
    {n:'military_service',l:'هل أديت الخدمة الوطنية؟',t:'sel',opts:['نعم','لا','معفى']},
    {n:'motivation',l:'دوافع الالتحاق',t:'area'},
    {n:'previous_service',l:'الخدمات السابقة (إن وجدت)',t:'area'},
  ])
});

T.army_request        = militaryBase('الجيش الوطني الشعبي','السيد اللواء قائد المنطقة العسكرية');
T.police_request      = militaryBase('الشرطة الوطنية','السيد المدير العام للأمن الوطني');
T.gendarmerie_request = militaryBase('الدرك الوطني','السيد اللواء القائد العام للدرك الوطني');
T.civil_protection    = militaryBase('الحماية المدنية','السيد المدير العام للحماية المدنية');
T.customs_request     = militaryBase('الجمارك الجزائرية','السيد المدير العام للجمارك');
T.prison_request      = militaryBase('إدارة السجون وإعادة الإدماج','السيد المدير العام لإدارة السجون');

T.military_exemption = { title:'طلب الإعفاء من الخدمة الوطنية', fields: std([
  ...person(),
  {n:'reason',l:'سبب الإعفاء',t:'sel',opts:['حالة صحية','الابن الوحيد للأسرة','أسباب عائلية','معاق']},
  {n:'details',l:'التفاصيل والمبررات',t:'area',r:true},
  {n:'supporting_docs',l:'الوثائق المرفقة',t:'area'},
])};

T.military_delay = { title:'طلب تأجيل الخدمة الوطنية', fields: std([
  ...person(),
  {n:'reason',l:'سبب التأجيل',t:'sel',opts:['مواصلة الدراسة','وضع عائلي','عمل ضروري','مرض']},
  {n:'duration',l:'مدة التأجيل المطلوبة',t:'text',r:true},
  {n:'details',l:'التفاصيل',t:'area',r:true},
])};

T.police_complaint = { title:'شكوى إلى الشرطة الوطنية', fields: std([
  ...person(),
  {n:'incident_date',l:'تاريخ الحادثة',t:'date',r:true},
  {n:'incident_place',l:'مكان الحادثة',t:'text',r:true},
  {n:'suspect',l:'اسم المشتبه به (إن عُرف)',t:'text'},
  {n:'facts',l:'وقائع الحادثة',t:'area',r:true},
  {n:'damages',l:'الأضرار المادية/المعنوية',t:'area'},
  {n:'request',l:'ما تطلبه من الجهة',t:'area',r:true},
])};

T.gendarmerie_complaint = {...T.police_complaint, title:'شكوى إلى الدرك الوطني'};

// ═══════════════════════════════════════════
// 2. شخصية ومهنية
// ═══════════════════════════════════════════
T.cv = { title:'السيرة الذاتية (CV)', fields: [
  {n:'fullName',l:'الاسم واللقب',t:'text',r:true},
  {n:'jobTitle',l:'المسمى الوظيفي المطلوب',t:'text'},
  {n:'phone',l:'الهاتف',t:'text',r:true},
  {n:'email',l:'البريد الإلكتروني',t:'text'},
  {n:'address',l:'العنوان',t:'text',r:true},
  {n:'birthDate',l:'تاريخ الميلاد',t:'date'},
  {n:'birthPlace',l:'مكان الميلاد',t:'text'},
  {n:'status',l:'الحالة الاجتماعية',t:'sel',opts:['أعزب','متزوج','مطلق','أرمل']},
  {n:'nationalId',l:'رقم التعريف الوطني',t:'text'},
  {n:'summary',l:'الملخص الشخصي',t:'area'},
  {n:'degree',l:'أعلى شهادة',t:'text',r:true},
  {n:'school',l:'المؤسسة التعليمية',t:'text',r:true},
  {n:'gradYear',l:'سنة التخرج',t:'text'},
  {n:'specialty',l:'التخصص',t:'text'},
  {n:'education',l:'التعليم التفصيلي (الشهادة|المؤسسة|السنة — افصل المداخل بـ ||)',t:'area'},
  {n:'experience',l:'الخبرة المهنية (المنصب|الشركة|الفترة|الوصف — افصل بـ ||)',t:'area'},
  {n:'skills',l:'المهارات (كل مهارة في سطر)',t:'area'},
  {n:'languages',l:'اللغات (كل لغة في سطر)',t:'area'},
  {n:'certifications',l:'شهادات ودورات (كل واحدة في سطر)',t:'area'},
]};

T.job_request = { title:'طلب عمل', fields: std([
  ...person(),
  {n:'companyName',l:'اسم المؤسسة',t:'text',r:true},
  {n:'position',l:'المنصب المطلوب',t:'text',r:true},
  {n:'degree',l:'الشهادة',t:'text',r:true},
  {n:'specialty',l:'التخصص',t:'text'},
  {n:'school',l:'المؤسسة التعليمية',t:'text'},
  {n:'gradYear',l:'سنة التخرج',t:'text'},
  {n:'experience',l:'الخبرة المهنية',t:'area'},
  {n:'skills',l:'المهارات',t:'text'},
])};

T.motivation_letter = { title:'رسالة تحفيزية', fields: std([
  {n:'fullName',l:'الاسم واللقب',t:'text',r:true},
  {n:'companyName',l:'اسم المؤسسة',t:'text',r:true},
  {n:'position',l:'المنصب المطلوب',t:'text',r:true},
  {n:'school',l:'المؤسسة التعليمية',t:'text'},
  {n:'specialty',l:'التخصص',t:'text'},
  {n:'skills',l:'أبرز مهاراتك',t:'text'},
  {n:'motivation',l:'دافعك للتقدم',t:'area'},
])};

T.resignation = { title:'رسالة استقالة', fields: std([
  {n:'fullName',l:'اسم المستقيل',t:'text',r:true},
  {n:'position',l:'المنصب الحالي',t:'text',r:true},
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'bossName',l:'اسم المسؤول',t:'text',r:true},
  {n:'bossTitle',l:'منصب المسؤول',t:'text'},
  {n:'resignDate',l:'تاريخ الاستقالة',t:'date',r:true},
  {n:'since',l:'تاريخ التوظيف',t:'date'},
  {n:'reason',l:'سبب الاستقالة',t:'text'},
])};

T.honor_declaration = { title:'تصريح شرفي', fields: std([
  ...person(),
  {n:'content',l:'محتوى التصريح',t:'area',r:true},
  {n:'purpose',l:'الغرض من التصريح',t:'text'},
])};

T.work_cert_request = { title:'طلب شهادة عمل', fields: std([
  ...person(),
  {n:'position',l:'المنصب',t:'text',r:true},
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'since',l:'تاريخ بداية العمل',t:'date'},
  {n:'purpose',l:'الغرض من الشهادة',t:'text'},
])};

T.salary_cert = { title:'شهادة راتب', fields: std([
  ...person(),
  {n:'position',l:'المنصب',t:'text',r:true},
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'salary',l:'الراتب الشهري الصافي (دج)',t:'number',r:true},
  {n:'purpose',l:'الغرض',t:'text'},
])};

T.experience_cert = { title:'شهادة خبرة مهنية', fields: std([
  ...person(),
  {n:'position',l:'المنصب',t:'text',r:true},
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'startDate',l:'تاريخ بداية العمل',t:'date',r:true},
  {n:'endDate',l:'تاريخ نهاية العمل',t:'date'},
  {n:'tasks',l:'المهام الرئيسية',t:'area'},
])};

T.internship_request = { title:'طلب تربص مهني', fields: std([
  ...person(),
  {n:'companyName',l:'اسم المؤسسة',t:'text',r:true},
  {n:'specialty',l:'التخصص',t:'text',r:true},
  {n:'school',l:'المؤسسة التعليمية',t:'text',r:true},
  {n:'duration',l:'مدة التربص',t:'text',r:true},
  {n:'startDate',l:'تاريخ البداية المقترح',t:'date'},
])};

T.leave_request = { title:'طلب إجازة', fields: std([
  ...person(),
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'position',l:'المنصب',t:'text',r:true},
  {n:'bossName',l:'اسم المسؤول',t:'text',r:true},
  {n:'leaveType',l:'نوع الإجازة',t:'sel',opts:['سنوية','استثنائية','بدون أجر','لأسباب شخصية']},
  {n:'days',l:'عدد الأيام',t:'number',r:true},
  {n:'startDate',l:'تاريخ البداية',t:'date',r:true},
  {n:'endDate',l:'تاريخ النهاية',t:'date',r:true},
  {n:'reason',l:'السبب',t:'area'},
])};

T.sick_leave      = {...T.leave_request, title:'طلب إجازة مرضية'};
T.maternity_leave = {...T.leave_request, title:'طلب إجازة أمومة'};
T.exceptional_leave={...T.leave_request,title:'طلب إجازة استثنائية'};

T.promotion_request = { title:'طلب ترقية', fields: std([
  ...person(),
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'currentPos',l:'المنصب الحالي',t:'text',r:true},
  {n:'requestedPos',l:'المنصب المطلوب',t:'text',r:true},
  {n:'since',l:'تاريخ التوظيف',t:'date'},
  {n:'achievements',l:'الإنجازات والمؤهلات',t:'area',r:true},
])};

T.mutation_request = { title:'طلب نقل وظيفي', fields: std([
  ...person(),
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'position',l:'المنصب الحالي',t:'text',r:true},
  {n:'currentLocation',l:'موقع العمل الحالي',t:'text',r:true},
  {n:'requestedLocation',l:'موقع العمل المطلوب',t:'text',r:true},
  {n:'reason',l:'سبب طلب النقل',t:'area',r:true},
])};

T.termination_letter = { title:'رسالة إنهاء عقد عمل', fields: std([
  {n:'companyName',l:'اسم المؤسسة',t:'text',r:true},
  {n:'managerName',l:'اسم الممثل القانوني',t:'text',r:true},
  {n:'employeeName',l:'اسم الموظف',t:'text',r:true},
  {n:'position',l:'المنصب',t:'text',r:true},
  {n:'reason',l:'سبب الإنهاء',t:'sel',opts:['انتهاء العقد','خطأ مهني','تخفيض الكادر','اتفاق مشترك']},
  {n:'lastDay',l:'آخر يوم عمل',t:'date',r:true},
  {n:'notice',l:'مدة الإشعار المسبق',t:'text'},
])};

T.complaint_employer = { title:'شكوى ضد صاحب العمل', fields: std([
  ...person(),
  {n:'employerName',l:'اسم صاحب العمل',t:'text',r:true},
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'authority',l:'الجهة المرسل إليها',t:'text',r:true},
  {n:'facts',l:'وقائع الشكوى',t:'area',r:true},
  {n:'request',l:'ما تطلبه',t:'area',r:true},
])};

// ═══════════════════════════════════════════
// 3. عقود العمل
// ═══════════════════════════════════════════
const contractBase = (title) => ({ title, fields: std([
  {n:'company',l:'اسم المؤسسة',t:'text',r:true},
  {n:'rc',l:'رقم السجل التجاري',t:'text'},
  {n:'managerName',l:'اسم الممثل القانوني',t:'text',r:true},
  {n:'employeeName',l:'اسم الموظف',t:'text',r:true},
  {n:'employeeNID',l:'رقم تعريف الموظف',t:'text',r:true},
  {n:'employeeAddress',l:'عنوان الموظف',t:'text'},
  {n:'position',l:'المنصب',t:'text',r:true},
  {n:'startDate',l:'تاريخ المباشرة',t:'date',r:true},
  {n:'salary',l:'الراتب الشهري (دج)',t:'number',r:true},
  {n:'hours',l:'ساعات العمل اليومية',t:'text'},
  {n:'duration',l:'المدة (للعقود المحددة)',t:'text'},
  {n:'trialPeriod',l:'فترة التجربة',t:'text'},
])});

T.employment_contract = contractBase('عقد عمل محدد المدة (CDD)');
T.cdi_contract        = contractBase('عقد عمل غير محدد المدة (CDI)');
T.internship_contract = contractBase('عقد تربص');
T.part_time_contract  = contractBase('عقد عمل بدوام جزئي');
T.remote_contract     = contractBase('عقد عمل عن بعد');
T.freelance_contract  = contractBase('عقد عمل مستقل');

// ═══════════════════════════════════════════
// 4. السكن والإيجار
// ═══════════════════════════════════════════
T.rental_contract = { title:'عقد إيجار سكني', fields: std([
  {n:'contractDate',l:'تاريخ العقد',t:'date',r:true},
  {n:'ownerName',l:'اسم المؤجِّر',t:'text',r:true},
  {n:'ownerNID',l:'رقم تعريف المؤجِّر',t:'text',r:true},
  {n:'ownerAddress',l:'عنوان المؤجِّر',t:'text',r:true},
  {n:'tenantName',l:'اسم المستأجر',t:'text',r:true},
  {n:'tenantNID',l:'رقم تعريف المستأجر',t:'text',r:true},
  {n:'tenantAddress',l:'عنوان المستأجر الحالي',t:'text',r:true},
  {n:'propertyAddress',l:'عنوان المسكن المؤجَّر',t:'text',r:true},
  {n:'wilaya',l:'الولاية',t:'text',r:true},
  {n:'rooms',l:'عدد الغرف',t:'text',r:true},
  {n:'floor',l:'الطابق',t:'text'},
  {n:'duration',l:'مدة الإيجار',t:'text',r:true},
  {n:'startDate',l:'تاريخ البداية',t:'date',r:true},
  {n:'endDate',l:'تاريخ النهاية',t:'date',r:true},
  {n:'rent',l:'الإيجار الشهري (دج)',t:'number',r:true},
  {n:'deposit',l:'مبلغ الضمان',t:'text'},
])};

T.commercial_rental   = {...T.rental_contract, title:'عقد إيجار تجاري'};
T.sublease_contract   = {...T.rental_contract, title:'عقد إيجار من الباطن'};

T.rent_receipt = { title:'وصل استلام الإيجار', fields: std([
  {n:'ownerName',l:'اسم المستلِم (المالك)',t:'text',r:true},
  {n:'tenantName',l:'اسم الدافع (المستأجر)',t:'text',r:true},
  {n:'amount',l:'المبلغ المستلم (دج)',t:'number',r:true},
  {n:'amountText',l:'المبلغ بالحروف',t:'text',r:true},
  {n:'month',l:'شهر الإيجار',t:'text',r:true},
  {n:'propertyAddress',l:'عنوان المسكن',t:'text',r:true},
])};

T.eviction_notice = { title:'إشعار إخلاء المسكن', fields: std([
  {n:'ownerName',l:'اسم المالك',t:'text',r:true},
  {n:'tenantName',l:'اسم المستأجر',t:'text',r:true},
  {n:'propertyAddress',l:'عنوان المسكن',t:'text',r:true},
  {n:'reason',l:'سبب طلب الإخلاء',t:'area',r:true},
  {n:'deadline',l:'الأجل الممنوح',t:'text',r:true},
  {n:'vacateDate',l:'تاريخ الإخلاء المطلوب',t:'date',r:true},
])};

T.formal_notice_tenant = { title:'إنذار رسمي للمستأجر', fields: std([
  {n:'ownerName',l:'اسم المالك',t:'text',r:true},
  {n:'tenantName',l:'اسم المستأجر',t:'text',r:true},
  {n:'address',l:'عنوان المسكن',t:'text',r:true},
  {n:'content',l:'موضوع الإنذار',t:'area',r:true},
  {n:'request',l:'ما يُطالب به',t:'area',r:true},
  {n:'deadline',l:'الأجل',t:'text',r:true},
])};

T.residence_proof = { title:'شهادة إقامة', fields: std([
  ...person(),
  {n:'purpose',l:'الغرض',t:'text'},
])};

T.property_handover = { title:'محضر تسليم المسكن', fields: std([
  {n:'ownerName',l:'اسم المالك',t:'text',r:true},
  {n:'tenantName',l:'اسم المستأجر',t:'text',r:true},
  {n:'propertyAddress',l:'عنوان المسكن',t:'text',r:true},
  {n:'condition',l:'حالة المسكن',t:'sel',opts:['ممتاز','جيد','مقبول','يحتاج إصلاح']},
  {n:'notes',l:'ملاحظات',t:'area'},
  {n:'keys',l:'عدد المفاتيح المسلَّمة',t:'number'},
])};

T.rent_increase    = {...T.formal_notice_tenant, title:'إشعار رفع بدل الإيجار'};
T.roommate_agreement = {...T.rental_contract, title:'اتفاقية مشاركة السكن'};

// ═══════════════════════════════════════════
// 5. قانونية
// ═══════════════════════════════════════════
T.written_commitment = { title:'تعهد كتابي', fields: std([
  ...person(),
  {n:'commitment',l:'موضوع التعهد',t:'area',r:true},
  {n:'deadline',l:'الأجل المحدد',t:'text',r:true},
])};

T.money_receipt = { title:'وصل استلام مبلغ مالي', fields: std([
  {n:'receiverName',l:'اسم المستلِم',t:'text',r:true},
  {n:'receiverNID',l:'رقم تعريف المستلِم',t:'text'},
  {n:'payerName',l:'اسم الدافع',t:'text',r:true},
  {n:'payerNID',l:'رقم تعريف الدافع',t:'text'},
  {n:'amount',l:'المبلغ بالأرقام (دج)',t:'number',r:true},
  {n:'amountText',l:'المبلغ بالحروف',t:'text',r:true},
  {n:'reason',l:'سبب الدفع',t:'text',r:true},
])};

T.formal_notice = { title:'إنذار رسمي', fields: std([
  {n:'senderName',l:'اسم المُرسِل',t:'text',r:true},
  {n:'senderAddress',l:'عنوان المُرسِل',t:'text',r:true},
  {n:'receiverName',l:'اسم المُرسَل إليه',t:'text',r:true},
  {n:'receiverAddress',l:'عنوانه',t:'text',r:true},
  {n:'subject',l:'موضوع الإنذار',t:'text',r:true},
  {n:'content',l:'محتوى الإنذار',t:'area',r:true},
  {n:'deadline',l:'الأجل الممنوح',t:'text'},
])};

T.debt_acknowledgment = { title:'إقرار بالدين', fields: std([
  ...person(),
  {n:'creditorName',l:'اسم الدائن',t:'text',r:true},
  {n:'amount',l:'المبلغ (دج)',t:'number',r:true},
  {n:'amountText',l:'المبلغ بالحروف',t:'text',r:true},
  {n:'origin',l:'مصدر الدين',t:'text',r:true},
  {n:'repayDate',l:'تاريخ السداد',t:'date',r:true},
  {n:'schedule',l:'طريقة السداد',t:'text'},
])};

T.power_of_attorney = { title:'توكيل رسمي عام', fields: std([
  {n:'principalName',l:'اسم الموكِّل',t:'text',r:true},
  {n:'principalNID',l:'رقم تعريف الموكِّل',t:'text',r:true},
  {n:'principalAddress',l:'عنوان الموكِّل',t:'text',r:true},
  {n:'agentName',l:'اسم الوكيل',t:'text',r:true},
  {n:'agentNID',l:'رقم تعريف الوكيل',t:'text',r:true},
  {n:'agentAddress',l:'عنوان الوكيل',t:'text',r:true},
  {n:'powers',l:'صلاحيات الوكيل',t:'area',r:true},
  {n:'expiry',l:'تاريخ انتهاء التوكيل (اختياري)',t:'date'},
])};

T.special_poa        = {...T.power_of_attorney, title:'توكيل رسمي خاص'};
T.admin_complaint = { title:'شكوى إدارية', fields: std([
  ...person(),
  {n:'authority',l:'الجهة المرسل إليها',t:'text',r:true},
  {n:'subject',l:'موضوع الشكوى',t:'text',r:true},
  {n:'facts',l:'وقائع الشكوى',t:'area',r:true},
  {n:'request',l:'ما تطلبه',t:'area',r:true},
])};

T.appeal_request = { title:'طعن إداري', fields: std([
  ...person(),
  {n:'decision',l:'القرار المطعون فيه',t:'text',r:true},
  {n:'authority',l:'الجهة',t:'text',r:true},
  {n:'grounds',l:'أسباب الطعن',t:'area',r:true},
  {n:'request',l:'ما تطلبه',t:'area',r:true},
])};

T.mediation_request  = {...T.admin_complaint, title:'طلب وساطة'};
T.disclaimer         = {...T.written_commitment, title:'إقرار بالتنازل'};
T.witness_statement  = {...T.honor_declaration, title:'شهادة شاهد'};
T.bail_letter        = {...T.written_commitment, title:'خطاب كفالة'};
T.ownership_proof    = {...T.honor_declaration, title:'إثبات الملكية'};
T.heritage_declaration={...T.honor_declaration,title:'تصريح بالإرث'};
T.legal_complaint    = {...T.admin_complaint,   title:'شكوى قضائية'};

// ═══════════════════════════════════════════
// 6. تجارية
// ═══════════════════════════════════════════
T.invoice = { title:'فاتورة احترافية', fields: [
  {n:'invoiceNum',l:'رقم الفاتورة',t:'text',r:true},
  {n:'date',l:'التاريخ',t:'date',r:true},
  {n:'companyName',l:'اسم مؤسستك',t:'text',r:true},
  {n:'companyAddress',l:'عنوان المؤسسة',t:'text'},
  {n:'rc',l:'رقم السجل التجاري',t:'text'},
  {n:'nif',l:'رقم التعريف الجبائي (NIF)',t:'text'},
  {n:'phone',l:'الهاتف',t:'text'},
  {n:'clientName',l:'اسم الزبون',t:'text',r:true},
  {n:'clientAddress',l:'عنوان الزبون',t:'text'},
  {n:'items',l:'البنود: البيان|الكمية|السعر (كل بند في سطر)',t:'area',r:true},
  {n:'tva',l:'نسبة TVA %',t:'number'},
  {n:'notes',l:'ملاحظات',t:'area'},
]};

T.quote = {...T.invoice, title:'عرض سعر'};

T.service_contract = { title:'عقد خدمات', fields: std([
  {n:'clientName',l:'اسم صاحب العمل',t:'text',r:true},
  {n:'clientNID',l:'رقم تعريفه',t:'text'},
  {n:'providerName',l:'اسم مقدِّم الخدمة',t:'text',r:true},
  {n:'providerNID',l:'رقم تعريفه',t:'text'},
  {n:'service',l:'وصف الخدمة',t:'area',r:true},
  {n:'duration',l:'مدة الإنجاز',t:'text',r:true},
  {n:'price',l:'المقابل المادي (دج)',t:'number',r:true},
  {n:'payment',l:'طريقة الدفع',t:'text'},
  {n:'warranty',l:'الضمان',t:'text'},
])};

T.partnership_contract = { title:'عقد شراكة تجارية', fields: std([
  {n:'p1Name',l:'اسم الشريك الأول',t:'text',r:true},
  {n:'p1NID',l:'رقم تعريف الشريك الأول',t:'text',r:true},
  {n:'p2Name',l:'اسم الشريك الثاني',t:'text',r:true},
  {n:'p2NID',l:'رقم تعريف الشريك الثاني',t:'text',r:true},
  {n:'business',l:'موضوع الشراكة',t:'text',r:true},
  {n:'capital',l:'رأس المال (دج)',t:'number',r:true},
  {n:'share1',l:'حصة الشريك الأول (%)',t:'number',r:true},
  {n:'share2',l:'حصة الشريك الثاني (%)',t:'number',r:true},
  {n:'duration',l:'مدة الشراكة',t:'text'},
])};

T.sale_contract      = {...T.service_contract, title:'عقد بيع'};
T.purchase_order     = {...T.invoice, title:'طلب شراء'};
T.delivery_note      = {...T.invoice, title:'وصل تسليم بضاعة'};
T.credit_note        = {...T.money_receipt, title:'إشعار بالدائن'};
T.debit_note         = {...T.money_receipt, title:'إشعار بالمدين'};
T.loan_agreement     = {...T.debt_acknowledgment, title:'عقد قرض بين أفراد'};
T.guarantee_letter   = {...T.written_commitment, title:'خطاب ضمان'};
T.distribution_contract={...T.service_contract,title:'عقد توزيع'};
T.supply_contract    = {...T.service_contract, title:'عقد توريد'};
T.agency_contract    = {...T.partnership_contract,title:'عقد وكالة تجارية'};
T.franchise_contract = {...T.partnership_contract,title:'عقد امتياز تجاري'};

// ═══════════════════════════════════════════
// 7. إدارية وتعليمية
// ═══════════════════════════════════════════
const adminReq = (title) => ({ title, fields: std([
  ...person(),
  {n:'authority',l:'الجهة المرسل إليها',t:'text',r:true},
  {n:'subject',l:'الموضوع',t:'text',r:true},
  {n:'content',l:'تفاصيل الطلب',t:'area',r:true},
  {n:'attachments',l:'الوثائق المرفقة',t:'area'},
])});

T.scholarship_request = adminReq('طلب منحة دراسية');
T.school_transfer     = adminReq('طلب تحويل مدرسي');
T.university_transfer = adminReq('طلب تحويل جامعي');
T.diploma_equivalence = adminReq('طلب معادلة شهادة');
T.enrollment_request  = adminReq('طلب تسجيل في مؤسسة تعليمية');
T.exemption_request   = adminReq('طلب إعفاء من رسوم');
T.grant_request       = adminReq('طلب منحة اجتماعية');
T.housing_request     = adminReq('طلب سكن اجتماعي');
T.disability_card     = adminReq('طلب بطاقة الإعاقة');
T.birth_cert_request  = adminReq('طلب استخراج شهادة ميلاد');
T.identity_card       = adminReq('طلب بطاقة التعريف الوطنية');
T.passport_request    = adminReq('طلب جواز السفر');
T.driving_license     = adminReq('طلب رخصة السياقة');
T.permit_request      = adminReq('طلب رخصة إدارية');
T.name_change         = adminReq('طلب تغيير الاسم');

// ═══════════════════════════════════════════
// 8. صحية
// ═══════════════════════════════════════════
T.medical_certificate = { title:'شهادة طبية', fields: std([
  ...person(),
  {n:'diagnosis',l:'التشخيص',t:'text',r:true},
  {n:'restDays',l:'أيام الراحة',t:'number'},
  {n:'doctorName',l:'اسم الطبيب',t:'text',r:true},
  {n:'doctorSpec',l:'التخصص',t:'text'},
  {n:'purpose',l:'الغرض',t:'text'},
])};

T.cnas_request    = adminReq('طلب إلى CNAS');
T.casnos_request  = adminReq('طلب إلى CASNOS');
T.cnac_request    = adminReq('طلب إلى CNAC');
T.retirement_request = adminReq('طلب التقاعد');
T.pension_request    = adminReq('طلب معاش التقاعد');
T.social_aid_request = adminReq('طلب مساعدة اجتماعية');
T.hospital_complaint = {...T.admin_complaint, title:'شكوى إلى مستشفى'};
T.pharmacy_complaint = {...T.admin_complaint, title:'شكوى ضد صيدلية'};

// ═══════════════════════════════════════════
// 9. بناء وعقارات
// ═══════════════════════════════════════════
T.building_permit    = adminReq('طلب رخصة بناء');
T.demolish_permit    = adminReq('طلب رخصة هدم');
T.conformity_cert    = adminReq('طلب شهادة مطابقة');
T.property_division  = adminReq('طلب تقسيم عقاري');
T.property_sale      = {...T.sale_contract,    title:'عقد بيع عقار'};
T.property_donation  = {...T.written_commitment,title:'عقد هبة عقار'};
T.mortgage_contract  = {...T.debt_acknowledgment,title:'عقد رهن عقاري'};
T.construction_contract={...T.service_contract,title:'عقد مقاولة بناء'};

// ═══════════════════════════════════════════
// 10. سيارات
// ═══════════════════════════════════════════
T.car_sale_contract = { title:'عقد بيع سيارة', fields: std([
  {n:'sellerName',l:'اسم البائع',t:'text',r:true},
  {n:'sellerNID',l:'رقم تعريف البائع',t:'text',r:true},
  {n:'buyerName',l:'اسم المشتري',t:'text',r:true},
  {n:'buyerNID',l:'رقم تعريف المشتري',t:'text',r:true},
  {n:'brand',l:'ماركة السيارة',t:'text',r:true},
  {n:'model',l:'الطراز / النوع',t:'text',r:true},
  {n:'year',l:'سنة الصنع',t:'text',r:true},
  {n:'chassis',l:'رقم الهيكل',t:'text',r:true},
  {n:'plate',l:'رقم اللوحة',t:'text',r:true},
  {n:'price',l:'ثمن البيع (دج)',t:'number',r:true},
  {n:'priceText',l:'الثمن بالحروف',t:'text',r:true},
  {n:'condition',l:'حالة السيارة',t:'sel',opts:['ممتازة','جيدة','مقبولة','تحتاج إصلاح']},
])};

T.car_gift   = {...T.car_sale_contract, title:'عقد هبة سيارة'};
T.car_poa    = {...T.power_of_attorney, title:'توكيل سيارة'};
T.car_accident = { title:'محضر حادث مروري', fields: std([
  {n:'p1Name',l:'اسم الطرف الأول',t:'text',r:true},
  {n:'p1Plate',l:'لوحة سيارة الطرف الأول',t:'text',r:true},
  {n:'p1Insurance',l:'شركة تأمين الطرف الأول',t:'text'},
  {n:'p2Name',l:'اسم الطرف الثاني',t:'text',r:true},
  {n:'p2Plate',l:'لوحة سيارة الطرف الثاني',t:'text',r:true},
  {n:'p2Insurance',l:'شركة تأمين الطرف الثاني',t:'text'},
  {n:'accidentDate',l:'تاريخ الحادث',t:'date',r:true},
  {n:'location',l:'مكان الحادث',t:'text',r:true},
  {n:'description',l:'وصف الحادث',t:'area',r:true},
  {n:'damages',l:'الأضرار الناجمة',t:'area'},
  {n:'witnesses',l:'الشهود',t:'text'},
])};
T.taxi_license    = adminReq('طلب رخصة سيارة أجرة');
T.transport_request=adminReq('طلب رخصة النقل');

// ═══════════════════════════════════════════
// 11. تجارية وصناعية
// ═══════════════════════════════════════════
T.commerce_register    = adminReq('طلب سجل تجاري');
T.activity_declaration = adminReq('تصريح بالنشاط التجاري');
T.company_creation     = {...T.partnership_contract, title:'محضر تأسيس شركة'};
T.company_dissolution  = {...T.admin_complaint,      title:'محضر حل شركة'};
T.trademark_request    = adminReq('طلب تسجيل علامة تجارية');
T.industrial_permit    = adminReq('طلب رخصة صناعية');
T.export_request       = adminReq('طلب رخصة التصدير');
T.import_request       = adminReq('طلب رخصة الاستيراد');
T.artisan_card         = adminReq('طلب بطاقة الحرفي');
T.liberal_declaration  = adminReq('تصريح بممارسة مهنة حرة');

// ═══════════════════════════════════════════
// 12. زراعية
// ═══════════════════════════════════════════
T.farm_land_request  = adminReq('طلب أرض فلاحية');
T.agricultural_cert  = adminReq('طلب شهادة فلاحية');
T.water_right_request= adminReq('طلب حق المياه الفلاحية');
T.livestock_cert     = adminReq('تصريح بالثروة الحيوانية');
T.forest_permit      = adminReq('طلب رخصة الغابات');

// ═══════════════════════════════════════════
// 13. دينية وعائلية
// ═══════════════════════════════════════════
T.marriage_contract  = { title:'عقد زواج (صيغة مدنية)', fields: std([
  {n:'husbandName',l:'اسم الزوج',t:'text',r:true},
  {n:'husbandNID',l:'رقم تعريف الزوج',t:'text',r:true},
  {n:'wifeName',l:'اسم الزوجة',t:'text',r:true},
  {n:'wifeNID',l:'رقم تعريف الزوجة',t:'text',r:true},
  {n:'dowry',l:'المهر',t:'text'},
  {n:'witnesses',l:'الشهود',t:'text'},
])};
T.marriage_request   = adminReq('طلب الزواج');
T.divorce_request    = adminReq('طلب الطلاق');
T.custody_request    = adminReq('طلب الحضانة');
T.alimony_request    = adminReq('طلب النفقة');
T.adoption_request   = adminReq('طلب الكفالة');
T.hajj_request       = adminReq('طلب الاستفادة من رحلة الحج');
T.religious_marriage = {...T.honor_declaration, title:'تصريح شرفي للزواج الديني'};
T.will_document      = {...T.written_commitment, title:'وصية رسمية'};
T.heritage_request   = adminReq('طلب تقسيم الإرث');

// ═══════════════════════════════════════════
// 14. بنكية
// ═══════════════════════════════════════════
T.loan_request = { title:'طلب قرض بنكي', fields: std([
  ...person(),
  {n:'bankName',l:'اسم البنك',t:'text',r:true},
  {n:'branch',l:'الفرع',t:'text'},
  {n:'employer',l:'جهة العمل',t:'text'},
  {n:'position',l:'المنصب',t:'text'},
  {n:'salary',l:'الراتب الشهري (دج)',t:'number'},
  {n:'amount',l:'المبلغ المطلوب (دج)',t:'number',r:true},
  {n:'amountText',l:'المبلغ بالحروف',t:'text',r:true},
  {n:'purpose',l:'الغرض من القرض',t:'area',r:true},
  {n:'duration',l:'مدة السداد (شهر)',t:'number'},
])};
T.bnl_request     = {...T.loan_request, title:'طلب قرض BNL لموظفي الدولة'};
T.ansej_request   = adminReq('طلب تمويل ANADE/ANSEJ');
T.cnac_funding    = adminReq('طلب تمويل CNAC');
T.angem_request   = adminReq('طلب تمويل ANGEM');
T.bank_account_open=adminReq('طلب فتح حساب بنكي');
T.bank_complaint  = {...T.admin_complaint, title:'شكوى إلى بنك'};
T.cheque_dispute  = {...T.formal_notice,   title:'اعتراض على شيك'};
T.transfer_request= adminReq('طلب تحويل بنكي');
T.tax_exemption   = adminReq('طلب إعفاء ضريبي');

// ═══════════════════════════════════════════
// 15. بلدية
// ═══════════════════════════════════════════
T.mayor_request    = adminReq('طلب موجه لرئيس البلدية');
T.wali_request     = adminReq('طلب موجه للوالي');
T.daira_request    = adminReq('طلب موجه لرئيس الدائرة');
T.market_license   = adminReq('طلب رخصة سوق');
T.road_permit      = adminReq('طلب استعمال الطريق العام');
T.event_permit     = adminReq('طلب رخصة تنظيم فعالية');
T.cemetery_request = adminReq('طلب قطعة أرض في المقبرة');
T.urban_complaint  = {...T.admin_complaint, title:'شكوى تعمير / مخالفة بناء'};
T.noise_complaint  = {...T.admin_complaint, title:'شكوى إزعاج وضجيج'};
T.neighborhood_cert= {...T.honor_declaration,title:'شهادة من الجيران'};

// ═══════════════════════════════════════════
// 16. تربوية
// ═══════════════════════════════════════════
T.school_inscription   = adminReq('طلب تسجيل في المدرسة');
T.absence_justification= adminReq('تبرير غياب');
T.graduation_request   = adminReq('طلب استخراج شهادة التخرج');
T.results_request      = adminReq('طلب استخراج كشف النقاط');
T.school_certificate   = adminReq('طلب شهادة تمدرس');
T.bac_exam_request     = adminReq('طلب استخراج شهادة البكالوريا');
T.teacher_request      = {...T.job_request, title:'طلب التوظيف كأستاذ'};
T.parent_complaint     = {...T.admin_complaint, title:'شكوى ولي أمر إلى مدير المدرسة'};
T.tutoring_contract    = {...T.service_contract, title:'عقد دروس خصوصية'};

// ═══════════════════════════════════════════
// 17. اتصالات
// ═══════════════════════════════════════════
T.telecom_complaint  = {...T.admin_complaint, title:'شكوى إلى شركة اتصالات'};
T.arpce_complaint    = {...T.admin_complaint, title:'شكوى إلى ARPCE'};
T.internet_contract  = {...T.service_contract,title:'عقد خدمات إنترنت'};
T.software_contract  = {...T.service_contract,title:'عقد تطوير برمجيات'};
T.it_service_contract= {...T.service_contract,title:'عقد صيانة إعلامية'};
T.data_protection    = {...T.written_commitment,title:'سياسة حماية البيانات'};

// ═══════════════════════════════════════════
// 18. بيئية
// ═══════════════════════════════════════════
T.environment_complaint= {...T.admin_complaint, title:'شكوى بيئية'};
T.solar_request        = adminReq('طلب منظومة طاقة شمسية');
T.water_complaint      = {...T.admin_complaint, title:'شكوى انقطاع المياه / ADE'};
T.electricity_complaint= {...T.admin_complaint, title:'شكوى انقطاع الكهرباء / SONELGAZ'};
T.gas_complaint        = {...T.admin_complaint, title:'شكوى الغاز الطبيعي'};
T.waste_complaint      = {...T.admin_complaint, title:'شكوى النفايات الصلبة'};

// ═══════════════════════════════════════════
// 19. رياضية وثقافية
// ═══════════════════════════════════════════
T.sports_club_request  = adminReq('طلب تأسيس نادي رياضي');
T.cultural_club        = adminReq('طلب تأسيس جمعية ثقافية');
T.association_creation = adminReq('طلب تأسيس جمعية');
T.donation_letter      = {...T.written_commitment, title:'خطاب تبرع'};
T.sponsorship_request  = adminReq('طلب رعاية');
T.press_card_request   = adminReq('طلب بطاقة صحفي');

// ═══════════════════════════════════════════
// 20. مراسلات
// ═══════════════════════════════════════════
const letter = (title) => ({ title, fields: std([
  {n:'senderName',l:'اسم المُرسِل',t:'text',r:true},
  {n:'receiverName',l:'اسم المُرسَل إليه',t:'text',r:true},
  {n:'subject',l:'الموضوع',t:'text',r:true},
  {n:'content',l:'محتوى الرسالة',t:'area',r:true},
])});

T.official_letter      = letter('رسالة رسمية عامة');
T.thank_you_letter     = letter('رسالة شكر رسمية');
T.condolence_letter    = letter('رسالة تعزية رسمية');
T.recommendation_letter= letter('خطاب توصية');
T.acceptance_letter    = letter('خطاب قبول');
T.rejection_letter     = letter('خطاب رفض');
T.reminder_letter      = letter('رسالة تذكير');
T.invitation_letter    = letter('رسالة دعوة رسمية');
T.acknowledgment       = letter('وصل استلام وثيقة');
T.minutes = { title:'محضر اجتماع', fields: std([
  {n:'institution',l:'اسم المؤسسة',t:'text',r:true},
  {n:'meetingDate',l:'تاريخ الاجتماع',t:'date',r:true},
  {n:'attendees',l:'الحاضرون',t:'area',r:true},
  {n:'agenda',l:'جدول الأعمال',t:'area',r:true},
  {n:'decisions',l:'القرارات المتخذة',t:'area',r:true},
])};

module.exports = T;
