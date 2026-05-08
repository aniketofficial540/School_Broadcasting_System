import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { uploadContent } from "../../services/content.service";
import { SUBJECTS } from "../../data/mockData";
import { validateFile } from "../../utils/helpers";
import { Button } from "../../components/common/Button";

export default function UploadContentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    startTime: "",
    endTime: "",
    rotationDuration: 30,
  });

  const [file, setFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileError = validateFile(selectedFile);
    if (fileError) {
      setErrors((prev) => ({ ...prev, file: fileError }));
      return;
    }

    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: "" }));

    const previewUrl = URL.createObjectURL(selectedFile);
    setFilePreviewUrl(previewUrl);
  }

  function removeFile() {
    setFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.subject) newErrors.subject = "Please select a subject.";
    if (!formData.startTime) newErrors.startTime = "Start time is required.";
    if (!formData.endTime) newErrors.endTime = "End time is required.";
    if (!file) newErrors.file = "Please select an image file.";

    if (formData.startTime && formData.endTime) {
      if (new Date(formData.endTime) <= new Date(formData.startTime)) {
        newErrors.endTime = "End time must be after start time.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await uploadContent({
        ...formData,
        rotationDuration: Number(formData.rotationDuration),
        teacherId: user.teacherId,
        teacherName: user.name,
        fileUrl: filePreviewUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
        fileName: file.name,
        fileType: file.type,
      });

      toast.success("Content uploaded successfully! Awaiting principal approval.");
      navigate("/teacher/my-content");
    } catch (err) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function inputClass(fieldName) {
    return `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all
      ${errors[fieldName]
        ? "border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
      }`;
  }

  return (
    <div className="fade-in max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Upload Content</h1>
        <p className="text-gray-500 mt-1">Share new educational content with your students.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction to Algebra"
              className={inputClass("title")}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={inputClass("subject")}
            >
              <option value="">-- Select a subject --</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Briefly describe what this content covers..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image File <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">Allowed: JPG, PNG, GIF · Max size: 10MB</p>

            {!file ? (
              <label
                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                  ${errors.file ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300"}`}
              >
                <div className="text-3xl mb-2">🖼️</div>
                <p className="text-sm text-gray-500">Click to select an image</p>
                <p className="text-xs text-gray-400">or drag and drop</p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={filePreviewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    🗑 Remove File
                  </button>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 truncate">✅ {file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={inputClass("startTime")}
              />
              {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={inputClass("endTime")}
              />
              {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rotation Duration (seconds)
            </label>
            <p className="text-xs text-gray-400 mb-2">
              How long (in seconds) this content shows before the next one
            </p>
            <input
              type="number"
              name="rotationDuration"
              value={formData.rotationDuration}
              onChange={handleChange}
              min="5"
              max="300"
              className="w-32 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={submitting}
          >
            {submitting ? "Uploading..." : "📤 Upload Content"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => navigate("/teacher/dashboard")}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
