import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  FileUp,
  FolderOpen,
} from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const dropRef = useRef();

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setProgress(0);

    const type = f.type;
    if (type.startsWith("image/") || type.startsWith("video/") || type === "application/pdf") {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih file dulu!");

    setLoading(true);
    setProgress(0);
    setResult(null);

    try {
      const base64 = await toBase64(file);
      const res = await axios.post(
        "https://736b0f610470.ngrok-free.app/upload",
        {
          name: file.name,
          mimeType: file.type,
          data: base64.split(",")[1],
        },
        {
          onUploadProgress: (e) => {
            if (e.total) {
              setProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal upload file");
    }

    setLoading(false);
    setProgress(0);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/40 overflow-hidden"
      >
        {/* Header */}
        <div className="text-center py-6 px-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 mb-4">
            <UploadCloud className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Upload ke Google Drive</h1>
          <p className="text-gray-400 text-sm mt-1">
            Dukung gambar, video, dan PDF
          </p>
        </div>

        {/* Drop Zone */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput").click()}
          className="mx-5 mb-5 border-2 border-dashed border-gray-600 rounded-xl p-5 text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-gray-700/20"
        >
          {file ? (
            <div className="flex flex-col items-center">
              <FileUp className="w-8 h-8 text-blue-400 mb-2" />
              <p className="text-blue-300 text-sm font-medium truncate max-w-full">
                {file.name}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FolderOpen className="w-8 h-8 text-gray-500 mb-2" />
              <p className="text-gray-400 text-sm">
                Seret file atau klik untuk pilih
              </p>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mx-5 mb-5 bg-gray-700/30 rounded-xl p-3 border border-gray-600/50">
            {file.type.startsWith("image/") && (
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg object-contain max-h-40"
              />
            )}
            {file.type.startsWith("video/") && (
              <video
                controls
                src={preview}
                className="w-full rounded-lg max-h-40"
              />
            )}
            {file.type === "application/pdf" && (
              <iframe
                src={preview}
                className="w-full rounded-lg h-40"
                title="PDF Preview"
              ></iframe>
            )}
          </div>
        )}

        {/* Upload Button */}
        <div className="px-5 pb-6">
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`w-full py-3.5 rounded-xl font-medium text-white relative overflow-hidden transition-all
              ${
                loading || !file
                  ? "bg-blue-500/50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98]"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>
                  {progress > 0 ? `Mengunggah... ${progress}%` : "Memproses..."}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <UploadCloud className="w-4 h-4" />
                <span>Upload Sekarang</span>
              </div>
            )}

            {/* Animated progress bar inside button */}
            {loading && progress > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-blue-300"
              />
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-5 mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center"
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-emerald-400 font-medium">Upload berhasil!</p>
            <a
              href={result.webViewLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-blue-400 hover:text-blue-300 text-sm font-medium underline"
            >
              Lihat di Google Drive
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}