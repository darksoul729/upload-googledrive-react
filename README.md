Tentu! Berikut adalah versi **README.md yang telah diperbaiki dan disempurnakan** agar lebih profesional, rapi, dan sesuai standar repositori GitHub modern:

- Perbaikan tautan (hapus spasi berlebih)
- Format badge yang konsisten
- Penjelasan OAuth yang lebih akurat (karena `client_secret` tidak digunakan di frontend)
- Penyesuaian struktur dan gaya penulisan
- Penambahan catatan penting tentang keamanan OAuth di lingkungan client-side

---

### ✅ **README.md – Versi Final**

```markdown
# React Google Drive Upload

[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Build](https://github.com/darksoul729/react-drive-upload/actions/workflows/ci.yml/badge.svg)](https://github.com/darksoul729/react-drive-upload/actions)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A lightweight **React + Vite** application that uploads files directly to **Google Drive** using **Google Drive API** and **OAuth 2.0**.

> ⚠️ **Note**: This is a **frontend-only** demo. In production, sensitive operations (like token refresh) should be handled via a secure backend to avoid exposing credentials.

---

## ✨ Features

- Upload images, videos, and PDFs to Google Drive
- Google OAuth 2.0 authentication (via browser)
- Real-time upload progress
- File preview (image/video/PDF)
- Built with Vite for blazing-fast dev experience
- Fully responsive & modern UI with Tailwind CSS

---

## 🔐 Google OAuth Setup

> **Important**: Client-side apps **cannot securely store** `client_secret`. This project uses **implicit flow** or **authorization code flow with PKCE** (recommended). Only `client_id` is used in the frontend.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Enable the **Google Drive API**:
   - Navigation menu → **APIs & Services** → **Library** → Search “Google Drive API” → Enable.
4. Configure OAuth consent screen (External or Internal).
5. Create **OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:5173` (and your production domain)
   - Authorized redirect URIs: `http://localhost:5173` (Vite dev server port)
6. Copy your **Client ID**.

### 📄 `.env` file (in project root)

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

> 💡 **Never commit `.env`** — it’s already in `.gitignore`.  
> ❌ Do **not** include `client_secret` or `refresh_token` in frontend code.

---

## 🚀 Installation

```bash
git clone https://github.com/darksoul729/react-drive-upload.git
cd react-drive-upload
npm install
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173).

---

## 🏗 Build for Production

```bash
npm run build    # Builds to /dist
npm run preview  # Locally preview production build
```

---

## 📂 Project Structure

```
/src
  ├─ main.jsx          # App entry point
  ├─ App.jsx           # Main layout & logic
  ├─ components/       # Reusable UI (Upload, Preview, etc.)
  └─ services/         # Google Drive API integration
/public                # Static assets (favicon, etc.)
/vite.config.js        # Vite configuration
/.env                  # Environment variables (gitignored)
/README.md             # You are here!
```

---

## 🔒 Security Best Practices

- **Never expose** `client_secret`, refresh tokens, or API keys in frontend code.
- For production, use a **backend proxy** (e.g., Node.js/Express) to handle token exchange and file uploads securely.
- Restrict OAuth redirect URIs strictly.
- Use HTTPS in production.

---

## 📚 References

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Google Drive API Guide](https://developers.google.com/drive/api)
- [OAuth 2.0 for Browser-Based Apps (Google)](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)

---

MIT License • Copyright © 2025 [Darksoul729]
```

---

### ✅ Catatan Tambahan:
- Jika kamu **belum memiliki backend**, pertimbangkan untuk menambahkan catatan:  
  > _“This demo assumes you have a backend service to securely handle file uploads to Google Drive. The current frontend-only version is for educational purposes.”_
- Ganti `darksoul729` dengan username GitHub-mu jika perlu.
- Jika sudah ada `ci.yml`, pastikan path-nya benar.

Ingin aku bantu buatkan juga file `LICENSE`, `.gitignore`, atau contoh `vite.config.js`?