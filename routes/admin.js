const express = require('express');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../models/database');

const KEY = process.env.ADMIN_KEY || 'WATHIQATI_ADMIN_DZ_2025_CHANGE_ME';
const auth = (req,res,next) => req.headers['x-admin-key']===KEY ? next() : res.status(403).json({error:'ممنوع'});

router.post('/gen-codes', auth, (req,res) => {
  const {type,count=1} = req.body;
  const days = {monthly:30,'3months':90,yearly:365}[type];
  if (!days) return res.json({error:'نوع غير صحيح'});
  const codes=[];
  for(let i=0;i<Math.min(+count,100);i++){
    const c=`WQ-${type.slice(0,3).toUpperCase()}-${uuidv4().split('-')[0].toUpperCase()}`;
    db.prepare('INSERT INTO activation_codes(code,type,days) VALUES(?,?,?)').run(c,type,days);
    codes.push(c);
  }
  res.json({success:true,codes});
});

router.get('/codes', auth, (req,res) => {
  res.json({success:true,codes:db.prepare('SELECT * FROM activation_codes ORDER BY created_at DESC').all()});
});

router.delete('/codes/:id', auth, (req,res) => {
  db.prepare('DELETE FROM activation_codes WHERE id=?').run(req.params.id);
  res.json({success:true});
});

router.get('/stats', auth, (req,res) => {
  res.json({success:true,
    users:    db.prepare('SELECT COUNT(*) as c FROM users').get().c,
    active:   db.prepare("SELECT COUNT(*) as c FROM users WHERE trial_end>datetime('now') OR sub_end>datetime('now')").get().c,
    docs:     db.prepare('SELECT COUNT(*) as c FROM saved_docs').get().c,
    usedCodes:db.prepare('SELECT COUNT(*) as c FROM activation_codes WHERE used=1').get().c,
    freeCodes:db.prepare('SELECT COUNT(*) as c FROM activation_codes WHERE used=0').get().c,
  });
});

router.get('/users', auth, (req,res) => {
  res.json({success:true,users:db.prepare('SELECT id,email,name,sub_type,trial_end,sub_end,created_at FROM users ORDER BY created_at DESC').all()});
});

module.exports = router;
