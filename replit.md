# Wathiqati (وثيقتي)

Algerian official documents platform — a Node.js/Express web application.

## Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: SQLite via `better-sqlite3` (local file: `wathiqati.db`)
- **Auth**: Session-based with `express-session` + `bcryptjs`
- **Email**: Nodemailer (Gmail)
- **Frontend**: Static HTML/CSS/JS served from `public/`

## Project Structure

```
server.js           — App entry point, Express setup, routes
models/database.js  — SQLite DB init and schema
routes/auth.js      — Registration, login, OTP
routes/documents.js — Document CRUD
routes/admin.js     — Admin panel API
middleware/auth.js  — Session check middleware
services/email.js   — Email sending via Nodemailer
services/sms.js     — SMS service
public/             — Static frontend (HTML, CSS, JS)
  index.html        — Landing / login page
  dashboard.html    — User dashboard
  document.html     — Document view
  admin.html        — Admin panel
```

## Running

- **Port**: 5000 (set via `PORT` env var)
- **Workflow**: `node server.js`
- **Host**: `0.0.0.0`

## Environment Variables

- `PORT` — Server port (default: 5000)
- `SESSION_SECRET` — Express session secret
- `ADMIN_KEY` — Admin access key
- `GMAIL_USER` — Gmail address for sending emails
- `GMAIL_APP_PASS` — Gmail app password
- `EMAIL_DEV_MODE` — If set, disables actual email sending

## Deployment

Configured as `autoscale` deployment running `node server.js`.
