import React from "react";

export function EmptyState({ icon = "📭", title = "Nothing here yet", message = "" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center fade-in">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      {message && <p className="text-gray-500 text-sm max-w-sm">{message}</p>}
    </div>
  );
}
