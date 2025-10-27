Perfect! Berikut versi **README.md profesional dan “GitHub-ready”** dengan badge build, npm version, React, Vite, dan MIT License. Cocok untuk halaman repo:

````markdown
# React Google Drive Upload

[![Vite](https://img.shields.io/badge/Vite-4.0-blue?logo=vite)](https://vitejs.dev/) 
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![Build](https://github.com/darksoul729/react-drive-upload/actions/workflows/ci.yml/badge.svg)](https://github.com/darksoul729/react-drive-upload/actions)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A simple **React + Vite** project to upload files directly to **Google Drive** using **Google OAuth 2.0**.

---

## Features

- Upload files directly to Google Drive
- Google OAuth 2.0 authentication
- Fast development with Vite HMR
- Clean React + Vite setup
- Secure: environment variables for secrets

---

## Setup Google OAuth

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **Google Drive API**.
3. Create **OAuth 2.0 Client ID** for web application.
4. Store credentials in `.env` file (do **not** commit to GitHub):

```env
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_GOOGLE_CLIENT_SECRET=your_client_secret
VITE_GOOGLE_REFRESH_TOKEN=your_refresh_token
````

> `.env` is ignored by Git. Never commit secrets.

---

## Installation

```bash
git clone https://github.com/username/react-drive-upload.git
cd react-drive-upload
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
/src
  ├─ main.jsx          # Entry point
  ├─ App.jsx           # Main component
  ├─ components/       # React components
  └─ services/         # Google Drive API functions
/public                # Static files
/vite.config.js        # Vite config
.eslintrc.js           # ESLint config
.env                   # Google OAuth secrets (ignored)
/README.md             # Project documentation
```

---

## Security Notes

* Keep `.env` local only.
* Use environment variables or GitHub Secrets for production deployment.
* Do not commit any credentials.

---

## References

* [Vite Documentation](https://vitejs.dev/)
* [React Documentation](https://reactjs.org/)
* [Google Drive API](https://developers.google.com/drive/api)

```

