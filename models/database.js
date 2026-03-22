const sqlite3 = require('sqlite3').verbose();
const path    = require('path');
const dbPath  = process.env.DB_PATH || path.join(__dirname, '..', 'wathiqati.db');
const db      = new sqlite3.Database(dbPath);

const run = (sql, params=[]) => new Promise((res,rej) =>
  db.run(sql, params, function(e){ e ? rej(e) : res({lastInsertRowid:this.lastID, changes:this.changes}); }));
const get = (sql, params=[]) => new Promise((res,rej) =>
  db.get(sql, params, (e,row) => e ? rej(e) : res(row)));
const all = (sql, params=[]) => new Promise((res,rej) =>
  db.all(sql, params, (e,rows) => e ? rej(e) : res(rows)));

db.prepare = (sql) => ({
  run: (...p) => run(sql, p.flat()),
  get: (...p) => get(sql, p.flat()),
  all: (...p) => all(sql, p.flat())
});

db.exec2 = (sql) => new Promise((res,rej) => db.exec(sql, e => e ? rej(e) : res()));

db.exec2(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, name TEXT NOT NULL,
    ip_hash TEXT, device_fp TEXT, trial_end DATETIME, sub_end DATETIME,
    sub_type TEXT DEFAULT 'trial', is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS otp_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL, code TEXT NOT NULL, type TEXT DEFAULT 'register',
    expires_at DATETIME NOT NULL, used INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS activation_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL, type TEXT NOT NULL, days INTEGER NOT NULL,
    used INTEGER DEFAULT 0, used_by INTEGER, used_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_hash TEXT, fp TEXT, user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS saved_docs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL, doc_type TEXT NOT NULL,
    doc_title TEXT NOT NULL, doc_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`).then(() => {
  ['WQ-MON-TEST01','WQ-3MO-TEST01','WQ-YR-TEST01'].forEach((c,i) =>
    run('INSERT OR IGNORE INTO activation_codes(code,type,days) VALUES(?,?,?)',
      [c,['monthly','3months','yearly'][i],[30,90,365][i]]));
}).catch(console.error);

module.exports = db;
