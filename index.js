import express from "express";
import { google } from "googleapis";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PassThrough } from "stream";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Loaded ENV:", {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: !!process.env.GOOGLE_REFRESH_TOKEN,
  REDIRECT_URI: process.env.REDIRECT_URI,
});

const app = express();

/* ✅ Aktifkan CORS */
app.use(cors({
  origin: "https://d13d55731b23.ngrok-free.app", // bisa diganti: "https://d13d55731b23.ngrok-free.app"
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

/* ✅ Body parser besar (biar file besar bisa dikirim) */
app.use(bodyParser.json({ limit: "50mb" }));

/* --- Google Drive Setup --- */
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  REDIRECT_URI,
  GOOGLE_FOLDER_ID
} = process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

/* --- Endpoint Upload --- */
app.post("/upload", async (req, res) => {
  try {
    const { name, mimeType, data } = req.body;
    console.log("📦 Upload file:", name, mimeType);

    // ✅ Convert base64 ke stream
    const buffer = Buffer.from(data, "base64");
    const stream = new PassThrough();
    stream.end(buffer);

    const response = await drive.files.create({
      requestBody: {
        name,
        mimeType,
        parents: [GOOGLE_FOLDER_ID], // Folder tujuan di Drive
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: "id, name, webViewLink, webContentLink",
    });

    console.log("✅ File uploaded:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


/* --- Start Server --- */
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
