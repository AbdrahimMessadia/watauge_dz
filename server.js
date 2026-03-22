require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet  = require('helmet');
const path    = require('path');

require('./models/database');
const authRoutes  = require('./routes/auth');
const docRoutes   = require('./routes/documents');
const adminRoutes = require('./routes/admin');
const { checkSession } = require('./middleware/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'wathiqati_dz_2025_xK9mP',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 3600 * 1000
  }
}));

app.use('/api/auth',  authRoutes);
app.use('/api/docs',  checkSession, docRoutes);
app.use('/api/admin', adminRoutes);

app.get('/',          (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/dashboard', (_, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/doc/:id',   (_, res) => res.sendFile(path.join(__dirname, 'public', 'document.html')));
app.get('/admin',     (_, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ وثيقتي يعمل على http://0.0.0.0:' + PORT);
});
