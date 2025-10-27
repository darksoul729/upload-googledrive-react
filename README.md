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


git clone https://github.com/darksoul729/react-drive-upload.git
cd react-drive-upload
npm install
npm run dev

Open your browser to http://localhost:5173 .



npm run build    # Builds to /dist
npm run preview  # Locally preview production build




/src
  ├─ main.jsx          # App entry point
  ├─ App.jsx           # Main layout & logic
  ├─ components/       # Reusable UI (Upload, Preview, etc.)
  └─ services/         # Google Drive API integration
/public                # Static assets (favicon, etc.)
/vite.config.js        # Vite configuration
/.env                  # Environment variables (gitignored)
/README.md             # You are here!


🔒 Security Best Practices
Never expose client_secret, refresh tokens, or API keys in frontend code.
For production, use a backend proxy (e.g., Node.js/Express) to handle token exchange and file uploads securely.
Restrict OAuth redirect URIs strictly.
Use HTTPS in production.
📚 References
    - Vite Documentation
    - React Documentation
    - Google Drive API Guide
    - OAuth 2.0 for Browser-Based Apps (Google)


MIT License • Copyright © 2025 [darksoul729]

