export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getScheduleStatus(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "scheduled";
  if (now > end) return "expired";
  return "active";
}

export function validateFile(file) {
  if (!file) return "Please select a file.";

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, PNG, and GIF files are allowed.";
  }

  const maxSizeInBytes = 10 * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return "File size must be less than 10MB.";
  }

  return null;
}

export function getStatusStyles(status) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700 border border-green-200";
    case "rejected":
      return "bg-red-100 text-red-700 border border-red-200";
    case "pending":
    default:
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }
}

export function getScheduleStatusStyles(scheduleStatus) {
  switch (scheduleStatus) {
    case "active":
      return "bg-blue-100 text-blue-700 border border-blue-200";
    case "expired":
      return "bg-gray-100 text-gray-500 border border-gray-200";
    case "scheduled":
    default:
      return "bg-purple-100 text-purple-700 border border-purple-200";
  }
}

export function truncate(text, maxLength = 80) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
