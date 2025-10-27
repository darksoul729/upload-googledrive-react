

```markdown
# React Google Drive Upload

[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Build](https://github.com/darksoul729/react-drive-upload/actions/workflows/ci.yml/badge.svg)](https://github.com/darksoul729/react-drive-upload/actions)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A lightweight **React + Vite** application that uploads files directly to **Google Drive** using the **Google Drive API** and **OAuth 2.0**.

> ⚠️ **Note**: This is a **frontend-only demo**. In production, sensitive operations (like token refresh or file upload to Drive) **must be handled by a secure backend** to prevent credential exposure.

---

## ✨ Features

- Upload images, videos, and PDFs to Google Drive
- Google OAuth 2.0 authentication (via browser using PKCE)
- Real-time upload progress indicator
- Live file preview (image, video, PDF)
- Blazing-fast development with Vite + HMR
- Modern, responsive UI built with Tailwind CSS

---

## 🔐 Google OAuth Setup

> 🛑 **Critical**: Frontend apps **cannot and must not** use `client_secret`. This project uses **OAuth 2.0 with PKCE** (Proof Key for Code Exchange), which is secure for browser-based apps.

### Steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Enable the **Google Drive API**:
   - **Navigation menu** → **APIs & Services** → **Library**
   - Search for “Google Drive API” → Click → **Enable**
4. Configure the **OAuth consent screen**:
   - Under **APIs & Services** → **OAuth consent screen**
   - Choose **External** (or Internal if in a Google Workspace org)
   - Fill in required info (app name, user support email, etc.)
   - Add your email under **Test users** (required during testing)
5. Create **OAuth 2.0 Client ID**:
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - **Authorized JavaScript origins**:  
     `http://localhost:5173`  
     (Add your production domain later, e.g., `https://your-app.vercel.app`)
   - **Authorized redirect URIs**:  
     `http://localhost:5173`  
     (Same as above; Vite dev server runs on port 5173 by default)
6. Copy the **Client ID** (looks like `xxxxx-xxxxxxxxxxxxxx.apps.googleusercontent.com`).

### 📄 Create `.env` in your project root:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

> 🔒 **Never commit `.env`** — it’s already in `.gitignore`.  
> ❌ Do **not** include `client_secret`, refresh tokens, or access tokens in frontend code.

---

## 🚀 Installation

```bash
git clone https://github.com/darksoul729/react-drive-upload.git
cd react-drive-upload
npm install
npm run dev
```

Open your browser to: [http://localhost:5173](http://localhost:5173)

---

## 🏗 Build for Production

```bash
npm run build    # Outputs to /dist
npm run preview  # Preview the production build locally
```

---

## 📂 Project Structure

```
/src
  ├─ main.jsx          # App entry point
  ├─ App.jsx           # Main layout & logic
  ├─ components/       # Reusable UI (e.g., Upload.jsx)
  └─ services/         # Google Drive API integration (auth & upload)
/public                # Static assets (favicon, etc.)
/vite.config.js        # Vite configuration
/.env                  # Environment variables (gitignored)
/README.md             # You are here!
```

---

## 🔒 Security Best Practices

- ✅ **Only use `client_id`** in frontend code.
- ❌ **Never expose** `client_secret`, refresh tokens, or API keys.
- 🌐 Use a **backend service** (e.g., Node.js/Express, Firebase Functions) to:
  - Exchange authorization codes for access tokens
  - Perform actual file uploads to Google Drive
- 🔒 Always use **HTTPS** in production.
- 🚫 Restrict **Authorized JavaScript origins** and **Redirect URIs** strictly in Google Cloud Console.

---

## 📚 References

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Google Drive API](https://developers.google.com/drive/api)
- [OAuth 2.0 for Browser-Based Apps (Google)](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Using PKCE with OAuth 2.0 (Google)](https://developers.google.com/identity/protocols/oauth2/native-app)

---

MIT License • Copyright © 2025 [darksoul729](https://github.com/darksoul729)
```

---