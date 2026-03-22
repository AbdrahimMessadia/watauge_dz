// services/sms.js — خدمة إرسال الرسائل القصيرة
// يدعم: Twilio / Vonage / وضع التطوير

async function sendOTP(phone, code) {
  const msg = `وثيقتي: رمز التحقق الخاص بك هو ${code} — صالح 10 دقائق. لا تشاركه مع أحد.`;

  // ===== وضع التطوير: طباعة فقط =====
  if (process.env.SMS_DEV_MODE === 'true') {
    console.log(`[SMS-DEV] إلى ${phone}: ${msg}`);
    return { success: true, dev: true };
  }

  // ===== Twilio =====
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilio = require('twilio');
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: msg,
        from: process.env.TWILIO_FROM,
        to: '+' + phone
      });
      return { success: true };
    } catch (e) {
      console.error('[SMS-Twilio] خطأ:', e.message);
      return { success: false, error: e.message };
    }
  }

  // ===== Vonage (Nexmo) =====
  if (process.env.VONAGE_API_KEY && process.env.VONAGE_API_SECRET) {
    try {
      const { Vonage } = require('@vonage/server-sdk');
      const vonage = new Vonage({
        apiKey:    process.env.VONAGE_API_KEY,
        apiSecret: process.env.VONAGE_API_SECRET
      });
      await new Promise((resolve, reject) => {
        vonage.sms.send({
          to:   phone,
          from: process.env.VONAGE_FROM || 'WathiqatiDZ',
          text: msg
        }, (err, data) => {
          if (err) reject(err);
          else if (data.messages[0].status !== '0') reject(new Error(data.messages[0]['error-text']));
          else resolve(data);
        });
      });
      return { success: true };
    } catch (e) {
      console.error('[SMS-Vonage] خطأ:', e.message);
      return { success: false, error: e.message };
    }
  }

  // لا يوجد مزوّد SMS مضبوط
  console.error('[SMS] تحذير: لا يوجد مزوّد SMS مضبوط في .env');
  return { success: false, error: 'SMS_NOT_CONFIGURED' };
}

module.exports = { sendOTP };
