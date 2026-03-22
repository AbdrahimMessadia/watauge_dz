const express = require('express');
const router  = express.Router();
const db      = require('../models/database');
const gen     = require('../documents/generator');
const tpls    = require('../documents/templates');
const catalog = require('../documents/catalog');

router.get('/list',   (req,res) => res.json({success:true,catalog}));
router.get('/tpl/:t', (req,res) => {
  const t = tpls[req.params.t];
  if (!t) return res.json({success:false,message:'غير موجود'});
  res.json({success:true,template:t});
});

router.post('/gen/:t', (req,res) => {
  try {
    const type = req.params.t;
    if (!tpls[type]) return res.json({success:false,message:'نوع غير موجود'});
    const html = gen(type, req.body);
    let title = type;
    for (const cat of catalog) { const f=cat.docs.find(d=>d.id===type); if(f){title=f.title;break;} }
    db.prepare('INSERT INTO saved_docs(user_id,doc_type,doc_title,doc_data) VALUES(?,?,?,?)')
      .run(req.user.id, type, title, JSON.stringify(req.body));
    res.json({success:true,html});
  } catch(e){ res.json({success:false,message:e.message}); }
});

router.get('/mine', (req,res) => {
  const docs = db.prepare('SELECT id,doc_type,doc_title,created_at FROM saved_docs WHERE user_id=? ORDER BY created_at DESC').all(req.user.id);
  res.json({success:true,docs});
});

router.delete('/mine/:id', (req,res) => {
  db.prepare('DELETE FROM saved_docs WHERE id=? AND user_id=?').run(req.params.id,req.user.id);
  res.json({success:true});
});

module.exports = router;
