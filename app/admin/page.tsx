"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [imageZip, setImageZip] = useState<File | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      setLoggedIn(true);
    } else {
      alert("Wrong Password");
    }
  };

  const upload = async () => {
    if (!file) {
      alert("Choose Excel file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    alert(data.message);
  };

  const uploadImages = async () => {
    if (!imageZip) {
      alert("Choose ZIP file");
      return;
    }

    setUploadingImages(true);

    const formData = new FormData();
    formData.append("file", imageZip);

    const res = await fetch("/api/admin/upload-images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUploadingImages(false);

    alert(data.message);
  };

  if (!loggedIn) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
            Admin Login
          </h1>

          <p className="mb-8 text-center text-slate-500">
            أدخل كلمة المرور للوصول إلى لوحة الإدارة
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <button
            onClick={login}
            className="mt-6 h-12 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {/* Upload Products */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">
          Upload Excel File
        </h1>

        <p className="mt-2 text-slate-500">
          اختر ملف Excel لتحديث الأصناف.
        </p>

        <label className="mt-8 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-10 transition hover:border-blue-500 hover:bg-slate-50">
          <input
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <span className="text-slate-600">
            {file ? file.name : "اضغط لاختيار ملف Excel"}
          </span>
        </label>

        <button
          onClick={upload}
          disabled={loading}
          className="mt-8 h-12 w-full rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Products"}
        </button>
      </div>

      {/* Upload Images */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">
          Upload Images
        </h1>

        <p className="mt-2 text-slate-500">
          اختر ملف ZIP يحتوي على صور الأصناف.
        </p>

        <label className="mt-8 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-10 transition hover:border-blue-500 hover:bg-slate-50">
          <input
            type="file"
            accept=".zip"
            className="hidden"
            onChange={(e) => setImageZip(e.target.files?.[0] || null)}
          />

          <span className="text-slate-600">
            {imageZip ? imageZip.name : "اضغط لاختيار ملف ZIP"}
          </span>
        </label>

        <button
          onClick={uploadImages}
          disabled={uploadingImages}
          className="mt-8 h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploadingImages ? "Uploading..." : "Upload Images"}
        </button>
      </div>
    </main>
  );
}