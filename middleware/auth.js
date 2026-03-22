const db = require('../models/database');

function checkSession(req, res, next) {
  if (!req.session?.userId)
    return res.status(401).json({ error: 'غير مسجل', code: 'NOT_AUTH' });
  const user = db.prepare('SELECT * FROM users WHERE id=?').get(req.session.userId);
  if (!user) return res.status(401).json({ error: 'مستخدم غير موجود' });
  const now = new Date();
  const trialEnd = new Date(user.trial_end);
  const subEnd   = user.sub_end ? new Date(user.sub_end) : null;
  if (now > trialEnd && (!subEnd || now > subEnd))
    return res.status(403).json({ error: 'انتهت الفترة', code: 'EXPIRED' });
  req.user = user;
  next();
}

module.exports = { checkSession };
