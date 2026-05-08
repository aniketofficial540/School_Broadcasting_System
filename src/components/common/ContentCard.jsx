import React from "react";
import { StatusBadge, ScheduleBadge } from "./Badge";
import { formatDate, truncate } from "../../utils/helpers";

export function ContentCard({ item, actions }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 fade-in">
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        <img
          src={item.fileUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x200?text=Preview+Unavailable";
          }}
        />
        <div className="absolute top-2 right-2">
          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 font-display text-base mb-1">
          {item.title}
        </h3>

        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full mb-2">
          {item.subject}
        </span>

        {item.description && (
          <p className="text-gray-500 text-xs mb-3">{truncate(item.description, 80)}</p>
        )}

        <div className="flex items-center justify-between mb-3">
          <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
          <span className="text-xs text-gray-400">
            {item.rotationDuration}s rotation
          </span>
        </div>

        <div className="text-xs text-gray-400 mb-3 space-y-0.5">
          <div>▶ Start: {formatDate(item.startTime)}</div>
          <div>⏹ End: {formatDate(item.endTime)}</div>
        </div>

        {item.status === "rejected" && item.rejectionReason && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-2 mb-3">
            <p className="text-red-600 text-xs">
              <span className="font-medium">Reason: </span>
              {item.rejectionReason}
            </p>
          </div>
        )}

        {item.teacherName && (
          <div className="text-xs text-gray-400 mb-2">
            👤 {item.teacherName}
          </div>
        )}

        {actions && <div className="flex gap-2 mt-2">{actions}</div>}
      </div>
    </div>
  );
}
