import React from "react";

export function StatCard({ title, count, icon, color = "blue", description = "" }) {
  const colors = {
    blue:   { bg: "bg-blue-50",   icon: "bg-blue-100 text-blue-600",   text: "text-blue-700" },
    yellow: { bg: "bg-yellow-50", icon: "bg-yellow-100 text-yellow-600", text: "text-yellow-700" },
    green:  { bg: "bg-green-50",  icon: "bg-green-100 text-green-600",  text: "text-green-700" },
    red:    { bg: "bg-red-50",    icon: "bg-red-100 text-red-600",      text: "text-red-700" },
    purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", text: "text-purple-700" },
  };

  const theme = colors[color] || colors.blue;

  return (
    <div className={`${theme.bg} rounded-2xl p-6 border border-white shadow-sm fade-in`}>
      <div className={`${theme.icon} w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4`}>
        {icon}
      </div>

      <div className={`text-3xl font-bold font-display ${theme.text} mb-1`}>
        {count}
      </div>

      <div className="text-gray-700 font-medium text-sm">{title}</div>

      {description && (
        <div className="text-gray-500 text-xs mt-1">{description}</div>
      )}
    </div>
  );
}
