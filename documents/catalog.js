// كتالوج الوثائق الجزائرية الرسمية — 200 وثيقة
module.exports = [
  {
    cat: 'عسكرية وأمنية',
    icon: '🎖️',
    docs: [
      { id: 'army_request',        title: 'طلب الالتحاق بالجيش الوطني الشعبي',     icon: '⚔️' },
      { id: 'police_request',      title: 'طلب الالتحاق بالشرطة الوطنية',          icon: '👮' },
      { id: 'gendarmerie_request', title: 'طلب الالتحاق بالدرك الوطني',            icon: '🛡️' },
      { id: 'civil_protection',    title: 'طلب الالتحاق بالحماية المدنية',          icon: '🚒' },
      { id: 'customs_request',     title: 'طلب الالتحاق بالجمارك الجزائرية',       icon: '🏛️' },
      { id: 'prison_request',      title: 'طلب الالتحاق بإدارة السجون',            icon: '🔒' },
      { id: 'military_exemption',  title: 'طلب الإعفاء من الخدمة الوطنية',         icon: '📋' },
      { id: 'military_delay',      title: 'طلب تأجيل الخدمة الوطنية',              icon: '⏳' },
      { id: 'police_complaint',    title: 'شكوى إلى الشرطة الوطنية',               icon: '📢' },
      { id: 'gendarmerie_complaint','title': 'شكوى إلى الدرك الوطني',              icon: '📣' },
    ]
  },
  {
    cat: 'شخصية ومهنية',
    icon: '👤',
    docs: [
      { id: 'cv',                  title: 'السيرة الذاتية (CV)',                    icon: '📄' },
      { id: 'job_request',         title: 'طلب عمل',                               icon: '💼' },
      { id: 'motivation_letter',   title: 'رسالة تحفيزية',                         icon: '✉️' },
      { id: 'resignation',         title: 'رسالة استقالة',                         icon: '📤' },
      { id: 'honor_declaration',   title: 'تصريح شرفي',                            icon: '🏅' },
      { id: 'work_cert_request',   title: 'طلب شهادة عمل',                        icon: '📜' },
      { id: 'salary_cert',         title: 'شهادة راتب',                            icon: '💰' },
      { id: 'experience_cert',     title: 'شهادة خبرة مهنية',                      icon: '🎯' },
      { id: 'internship_request',  title: 'طلب تربص مهني',                         icon: '🎓' },
      { id: 'leave_request',       title: 'طلب إجازة',                             icon: '🌴' },
      { id: 'sick_leave',          title: 'طلب إجازة مرضية',                       icon: '🏥' },
      { id: 'maternity_leave',     title: 'طلب إجازة أمومة',                       icon: '👶' },
      { id: 'exceptional_leave',   title: 'طلب إجازة استثنائية',                   icon: '⭐' },
      { id: 'promotion_request',   title: 'طلب ترقية',                             icon: '📈' },
      { id: 'mutation_request',    title: 'طلب نقل وظيفي',                         icon: '🔄' },
      { id: 'termination_letter',  title: 'رسالة إنهاء عقد عمل',                  icon: '❌' },
      { id: 'complaint_employer',  title: 'شكوى ضد صاحب العمل',                   icon: '⚠️' },
    ]
  },
  {
    cat: 'عقود العمل',
    icon: '📃',
    docs: [
      { id: 'employment_contract', title: 'عقد عمل محدد المدة (CDD)',              icon: '📃' },
      { id: 'cdi_contract',        title: 'عقد عمل غير محدد المدة (CDI)',          icon: '📋' },
      { id: 'internship_contract', title: 'عقد تربص',                              icon: '🎓' },
      { id: 'part_time_contract',  title: 'عقد عمل بدوام جزئي',                   icon: '⏰' },
      { id: 'remote_contract',     title: 'عقد عمل عن بعد',                       icon: '💻' },
      { id: 'freelance_contract',  title: 'عقد عمل مستقل',                        icon: '🤝' },
    ]
  },
  {
    cat: 'السكن والإيجار',
    icon: '🏠',
    docs: [
      { id: 'rental_contract',     title: 'عقد إيجار سكني',                        icon: '🏠' },
      { id: 'commercial_rental',   title: 'عقد إيجار تجاري',                       icon: '🏢' },
      { id: 'rent_receipt',        title: 'وصل استلام الإيجار',                    icon: '🧾' },
      { id: 'eviction_notice',     title: 'إشعار إخلاء المسكن',                   icon: '🚪' },
      { id: 'formal_notice_tenant','title': 'إنذار رسمي للمستأجر',                icon: '⚠️' },
      { id: 'residence_proof',     title: 'شهادة إقامة',                           icon: '🏡' },
      { id: 'property_handover',   title: 'محضر تسليم المسكن',                    icon: '🔑' },
      { id: 'rent_increase',       title: 'إشعار رفع بدل الإيجار',                icon: '💹' },
      { id: 'sublease_contract',   title: 'عقد إيجار من الباطن',                  icon: '🏘️' },
      { id: 'roommate_agreement',  title: 'اتفاقية مشاركة السكن',                 icon: '👥' },
    ]
  },
  {
    cat: 'قانونية ومدنية',
    icon: '⚖️',
    docs: [
      { id: 'written_commitment',  title: 'تعهد كتابي',                            icon: '✍️' },
      { id: 'money_receipt',       title: 'وصل استلام مبلغ مالي',                 icon: '💵' },
      { id: 'formal_notice',       title: 'إنذار رسمي',                            icon: '📢' },
      { id: 'debt_acknowledgment', title: 'إقرار بالدين',                          icon: '📝' },
      { id: 'power_of_attorney',   title: 'توكيل رسمي عام',                        icon: '🔑' },
      { id: 'special_poa',         title: 'توكيل رسمي خاص',                        icon: '🔐' },
      { id: 'admin_complaint',     title: 'شكوى إدارية',                           icon: '📋' },
      { id: 'appeal_request',      title: 'طعن إداري',                             icon: '⚖️' },
      { id: 'mediation_request',   title: 'طلب وساطة',                             icon: '🕊️' },
      { id: 'disclaimer',          title: 'إقرار بالتنازل',                        icon: '✋' },
      { id: 'witness_statement',   title: 'شهادة شاهد',                            icon: '👁️' },
      { id: 'bail_letter',         title: 'خطاب كفالة',                            icon: '🛡️' },
      { id: 'ownership_proof',     title: 'إثبات الملكية',                         icon: '🏛️' },
      { id: 'heritage_declaration','title': 'تصريح بالإرث',                        icon: '👨‍👩‍👧' },
      { id: 'legal_complaint',     title: 'شكوى قضائية',                           icon: '🏛️' },
    ]
  },
  {
    cat: 'تجارية ومالية',
    icon: '💼',
    docs: [
      { id: 'invoice',             title: 'فاتورة احترافية',                       icon: '🧮' },
      { id: 'quote',               title: 'عرض سعر',                              icon: '📊' },
      { id: 'service_contract',    title: 'عقد خدمات',                             icon: '🤝' },
      { id: 'partnership_contract','title': 'عقد شراكة تجارية',                   icon: '👥' },
      { id: 'sale_contract',       title: 'عقد بيع',                               icon: '🛒' },
      { id: 'purchase_order',      title: 'طلب شراء',                              icon: '📦' },
      { id: 'delivery_note',       title: 'وصل تسليم بضاعة',                      icon: '🚚' },
      { id: 'credit_note',         title: 'إشعار بالدائن',                         icon: '💳' },
      { id: 'debit_note',          title: 'إشعار بالمدين',                         icon: '📉' },
      { id: 'loan_agreement',      title: 'عقد قرض بين أفراد',                    icon: '🤝' },
      { id: 'guarantee_letter',    title: 'خطاب ضمان',                             icon: '🛡️' },
      { id: 'distribution_contract','title':'عقد توزيع',                          icon: '🔀' },
      { id: 'supply_contract',     title: 'عقد توريد',                             icon: '📦' },
      { id: 'agency_contract',     title: 'عقد وكالة تجارية',                      icon: '🏪' },
      { id: 'franchise_contract',  title: 'عقد امتياز تجاري',                      icon: '🏬' },
    ]
  },
  {
    cat: 'إدارية وتعليمية',
    icon: '🏛️',
    docs: [
      { id: 'scholarship_request', title: 'طلب منحة دراسية',                       icon: '🎓' },
      { id: 'school_transfer',     title: 'طلب تحويل مدرسي',                       icon: '🏫' },
      { id: 'university_transfer', title: 'طلب تحويل جامعي',                       icon: '🎓' },
      { id: 'diploma_equivalence', title: 'طلب معادلة شهادة',                      icon: '📜' },
      { id: 'enrollment_request',  title: 'طلب تسجيل في مؤسسة تعليمية',           icon: '📝' },
      { id: 'exemption_request',   title: 'طلب إعفاء من رسوم',                    icon: '🙏' },
      { id: 'grant_request',       title: 'طلب منحة إجتماعية',                    icon: '💊' },
      { id: 'housing_request',     title: 'طلب سكن اجتماعي (LPL/LSP)',            icon: '🏘️' },
      { id: 'disability_card',     title: 'طلب بطاقة الإعاقة',                    icon: '♿' },
      { id: 'birth_cert_request',  title: 'طلب استخراج شهادة ميلاد',               icon: '👶' },
      { id: 'identity_card',       title: 'طلب بطاقة التعريف الوطنية',             icon: '🪪' },
      { id: 'passport_request',    title: 'طلب جواز السفر',                        icon: '✈️' },
      { id: 'driving_license',     title: 'طلب رخصة السياقة',                      icon: '🚗' },
      { id: 'permit_request',      title: 'طلب رخصة إدارية',                       icon: '📋' },
      { id: 'name_change',         title: 'طلب تغيير الاسم',                       icon: '✏️' },
    ]
  },
  {
    cat: 'صحية واجتماعية',
    icon: '🏥',
    docs: [
      { id: 'medical_certificate', title: 'شهادة طبية',                            icon: '🩺' },
      { id: 'cnas_request',        title: 'طلب إلى الصندوق الوطني للتأمينات (CNAS)',icon: '🏥' },
      { id: 'casnos_request',      title: 'طلب إلى CASNOS',                        icon: '💊' },
      { id: 'cnac_request',        title: 'طلب إلى الصندوق الوطني للبطالة (CNAC)', icon: '📋' },
      { id: 'retirement_request',  title: 'طلب التقاعد',                           icon: '👴' },
      { id: 'pension_request',     title: 'طلب معاش التقاعد',                      icon: '💰' },
      { id: 'social_aid_request',  title: 'طلب مساعدة اجتماعية',                   icon: '🤲' },
      { id: 'hospital_complaint',  title: 'شكوى إلى مستشفى / مصحة',              icon: '🏨' },
      { id: 'pharmacy_complaint',  title: 'شكوى ضد صيدلية',                       icon: '💊' },
    ]
  },
  {
    cat: 'بناء وعقارات',
    icon: '🏗️',
    docs: [
      { id: 'building_permit',     title: 'طلب رخصة بناء',                         icon: '🏗️' },
      { id: 'demolish_permit',     title: 'طلب رخصة هدم',                          icon: '🔨' },
      { id: 'conformity_cert',     title: 'طلب شهادة مطابقة',                      icon: '✅' },
      { id: 'property_division',   title: 'طلب تقسيم عقاري',                       icon: '📐' },
      { id: 'property_sale',       title: 'عقد بيع عقار',                          icon: '🏡' },
      { id: 'property_donation',   title: 'عقد هبة عقار',                          icon: '🎁' },
      { id: 'mortgage_contract',   title: 'عقد رهن عقاري',                         icon: '🏦' },
      { id: 'construction_contract','title':'عقد مقاولة بناء',                    icon: '🧱' },
    ]
  },
  {
    cat: 'سيارات ونقل',
    icon: '🚗',
    docs: [
      { id: 'car_sale_contract',   title: 'عقد بيع سيارة',                         icon: '🚗' },
      { id: 'car_gift',            title: 'عقد هبة سيارة',                         icon: '🎁' },
      { id: 'car_poa',             title: 'توكيل سيارة',                            icon: '🔑' },
      { id: 'car_accident',        title: 'محضر حادث مروري',                       icon: '💥' },
      { id: 'taxi_license',        title: 'طلب رخصة سيارة أجرة',                  icon: '🚕' },
      { id: 'transport_request',   title: 'طلب رخصة النقل',                        icon: '🚛' },
    ]
  },
  {
    cat: 'تجارية وصناعية',
    icon: '🏭',
    docs: [
      { id: 'commerce_register',   title: 'طلب سجل تجاري',                         icon: '📒' },
      { id: 'activity_declaration','title':'تصريح بالنشاط التجاري',               icon: '🏪' },
      { id: 'company_creation',    title: 'محضر تأسيس شركة',                       icon: '🏢' },
      { id: 'company_dissolution', title: 'محضر حل شركة',                          icon: '📉' },
      { id: 'trademark_request',   title: 'طلب تسجيل علامة تجارية',               icon: '™️' },
      { id: 'industrial_permit',   title: 'طلب رخصة صناعية',                       icon: '🏭' },
      { id: 'export_request',      title: 'طلب رخصة التصدير',                      icon: '🌍' },
      { id: 'import_request',      title: 'طلب رخصة الاستيراد',                    icon: '📥' },
      { id: 'artisan_card',        title: 'طلب بطاقة الحرفي',                      icon: '🔧' },
      { id: 'liberal_declaration', title: 'تصريح بممارسة مهنة حرة',                icon: '📋' },
    ]
  },
  {
    cat: 'زراعية وريفية',
    icon: '🌾',
    docs: [
      { id: 'farm_land_request',   title: 'طلب أرض فلاحية',                        icon: '🌾' },
      { id: 'agricultural_cert',   title: 'طلب شهادة فلاحية',                     icon: '🌿' },
      { id: 'water_right_request', title: 'طلب حق المياه الفلاحية',               icon: '💧' },
      { id: 'livestock_cert',      title: 'تصريح بالثروة الحيوانية',               icon: '🐄' },
      { id: 'forest_permit',       title: 'طلب رخصة الغابات',                      icon: '🌲' },
    ]
  },
  {
    cat: 'دينية وعائلية',
    icon: '🕌',
    docs: [
      { id: 'marriage_contract',   title: 'عقد زواج (صيغة مدنية)',                  icon: '💍' },
      { id: 'marriage_request',    title: 'طلب الزواج',                            icon: '💑' },
      { id: 'divorce_request',     title: 'طلب الطلاق',                            icon: '📄' },
      { id: 'custody_request',     title: 'طلب الحضانة',                           icon: '👶' },
      { id: 'alimony_request',     title: 'طلب النفقة',                            icon: '💰' },
      { id: 'adoption_request',    title: 'طلب الكفالة',                           icon: '👨‍👩‍👦' },
      { id: 'hajj_request',        title: 'طلب الاستفادة من رحلة الحج',            icon: '🕌' },
      { id: 'religious_marriage',  title: 'تصريح شرفي للزواج الديني',              icon: '📿' },
      { id: 'will_document',       title: 'وصية رسمية',                            icon: '📜' },
      { id: 'heritage_request',    title: 'طلب تقسيم الإرث',                       icon: '👨‍👩‍👧‍👦' },
    ]
  },
  {
    cat: 'بنكية ومالية',
    icon: '🏦',
    docs: [
      { id: 'loan_request',        title: 'طلب قرض بنكي',                          icon: '🏦' },
      { id: 'bnl_request',         title: 'طلب قرض BNL لموظفي الدولة',            icon: '🏛️' },
      { id: 'ansej_request',       title: 'طلب تمويل ANADE/ANSEJ',                icon: '💡' },
      { id: 'cnac_funding',        title: 'طلب تمويل CNAC',                        icon: '💰' },
      { id: 'angem_request',       title: 'طلب تمويل ANGEM (مشروع صغير)',          icon: '🌱' },
      { id: 'bank_account_open',   title: 'طلب فتح حساب بنكي',                    icon: '💳' },
      { id: 'bank_complaint',      title: 'شكوى إلى بنك',                          icon: '📢' },
      { id: 'cheque_dispute',      title: 'اعتراض على شيك',                        icon: '🚫' },
      { id: 'transfer_request',    title: 'طلب تحويل بنكي',                        icon: '🔄' },
      { id: 'tax_exemption',       title: 'طلب إعفاء ضريبي',                       icon: '📊' },
    ]
  },
  {
    cat: 'بلدية وولائية',
    icon: '🏛️',
    docs: [
      { id: 'mayor_request',       title: 'طلب موجه لرئيس البلدية',                icon: '🏛️' },
      { id: 'wali_request',        title: 'طلب موجه للوالي',                       icon: '📋' },
      { id: 'daira_request',       title: 'طلب موجه لرئيس الدائرة',               icon: '📄' },
      { id: 'market_license',      title: 'طلب رخصة سوق',                          icon: '🛒' },
      { id: 'road_permit',         title: 'طلب استعمال الطريق العام',              icon: '🛣️' },
      { id: 'event_permit',        title: 'طلب رخصة تنظيم فعالية',                icon: '🎪' },
      { id: 'cemetery_request',    title: 'طلب قطعة أرض في المقبرة',              icon: '🪦' },
      { id: 'urban_complaint',     title: 'شكوى تعمير / مخالفة بناء',              icon: '🏗️' },
      { id: 'noise_complaint',     title: 'شكوى إزعاج وضجيج',                     icon: '🔊' },
      { id: 'neighborhood_cert',   title: 'شهادة من الجيران',                      icon: '🏘️' },
    ]
  },
  {
    cat: 'تربوية ومدرسية',
    icon: '📚',
    docs: [
      { id: 'school_inscription',  title: 'طلب تسجيل في المدرسة',                  icon: '📚' },
      { id: 'absence_justification','title':'تبرير غياب',                         icon: '📝' },
      { id: 'graduation_request',  title: 'طلب استخراج شهادة التخرج',              icon: '🎓' },
      { id: 'results_request',     title: 'طلب استخراج كشف النقاط',               icon: '📊' },
      { id: 'school_certificate',  title: 'طلب شهادة تمدرس',                      icon: '📜' },
      { id: 'bac_exam_request',    title: 'طلب استخراج شهادة البكالوريا',          icon: '🎓' },
      { id: 'teacher_request',     title: 'طلب التوظيف كأستاذ',                  icon: '👨‍🏫' },
      { id: 'parent_complaint',    title: 'شكوى ولي أمر إلى مدير المدرسة',        icon: '📢' },
      { id: 'tutoring_contract',   title: 'عقد دروس خصوصية',                      icon: '📖' },
    ]
  },
  {
    cat: 'اتصالات وتكنولوجيا',
    icon: '💻',
    docs: [
      { id: 'telecom_complaint',   title: 'شكوى إلى شركة اتصالات (اتصالات/جيزي/موبيليس/أوريدو)', icon: '📱' },
      { id: 'arpce_complaint',     title: 'شكوى إلى ARPCE (سلطة الضبط)',          icon: '📡' },
      { id: 'internet_contract',   title: 'عقد خدمات إنترنت',                      icon: '🌐' },
      { id: 'software_contract',   title: 'عقد تطوير برمجيات',                    icon: '💻' },
      { id: 'it_service_contract', title: 'عقد صيانة إعلامية',                    icon: '🖥️' },
      { id: 'data_protection',     title: 'سياسة حماية البيانات',                  icon: '🔒' },
    ]
  },
  {
    cat: 'بيئية وطاقوية',
    icon: '🌿',
    docs: [
      { id: 'environment_complaint','title':'شكوى بيئية (تلوث/نفايات)',           icon: '🌿' },
      { id: 'solar_request',       title: 'طلب منظومة طاقة شمسية',                icon: '☀️' },
      { id: 'water_complaint',     title: 'شكوى انقطاع المياه / ADE',             icon: '💧' },
      { id: 'electricity_complaint','title':'شكوى انقطاع الكهرباء / SONELGAZ',   icon: '⚡' },
      { id: 'gas_complaint',       title: 'شكوى الغاز الطبيعي',                   icon: '🔥' },
      { id: 'waste_complaint',     title: 'شكوى النفايات الصلبة',                  icon: '🗑️' },
    ]
  },
  {
    cat: 'رياضية وثقافية',
    icon: '⚽',
    docs: [
      { id: 'sports_club_request', title: 'طلب تأسيس نادي رياضي',                  icon: '⚽' },
      { id: 'cultural_club',       title: 'طلب تأسيس جمعية ثقافية',               icon: '🎭' },
      { id: 'association_creation','title':'طلب تأسيس جمعية',                    icon: '🤝' },
      { id: 'donation_letter',     title: 'خطاب تبرع',                             icon: '🎁' },
      { id: 'sponsorship_request', title: 'طلب رعاية',                             icon: '💫' },
      { id: 'press_card_request',  title: 'طلب بطاقة صحفي',                       icon: '📰' },
    ]
  },
  {
    cat: 'مراسلات رسمية',
    icon: '📮',
    docs: [
      { id: 'official_letter',     title: 'رسالة رسمية عامة',                      icon: '📮' },
      { id: 'thank_you_letter',    title: 'رسالة شكر رسمية',                       icon: '🙏' },
      { id: 'condolence_letter',   title: 'رسالة تعزية رسمية',                    icon: '🕊️' },
      { id: 'recommendation_letter','title':'خطاب توصية',                         icon: '⭐' },
      { id: 'acceptance_letter',   title: 'خطاب قبول',                             icon: '✅' },
      { id: 'rejection_letter',    title: 'خطاب رفض',                              icon: '❌' },
      { id: 'reminder_letter',     title: 'رسالة تذكير',                           icon: '🔔' },
      { id: 'invitation_letter',   title: 'رسالة دعوة رسمية',                      icon: '💌' },
      { id: 'acknowledgment',      title: 'وصل استلام وثيقة',                      icon: '📩' },
      { id: 'minutes',             title: 'محضر اجتماع',                           icon: '📋' },
    ]
  },
];
