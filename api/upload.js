import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Ambil data dari request body
    const { name, mimeType, data } = req.body;

    if (!name || !mimeType || !data) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    // Autentikasi OAuth2
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const drive = google.drive({ version: "v3", auth });

    // Metadata file (nama, parent folder, dsb)
    const fileMetadata = {
      name,
      // Jika kamu mau upload ke folder tertentu di Drive:
      // parents: ["ID_FOLDER_GOOGLE_DRIVE"],
    };

    const media = {
      mimeType,
      body: Buffer.from(data, "base64"),
    };

    // Upload file ke Google Drive
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, name, webViewLink, webContentLink",
    });

    // Bikin file bisa dibuka publik (optional)
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Ambil link publik
    const file = await drive.files.get({
      fileId: response.data.id,
      fields: "webViewLink, webContentLink",
    });

    res.status(200).json({
      id: response.data.id,
      name: response.data.name,
      viewLink: file.data.webViewLink,
      downloadLink: file.data.webContentLink,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Gagal upload file", error: error.message });
  }
}
``