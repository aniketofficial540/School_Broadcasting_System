import React from "react";
import { getStatusStyles, getScheduleStatusStyles, getScheduleStatus } from "../../utils/helpers";

export function StatusBadge({ status }) {
  const styles = getStatusStyles(status);
  const labels = {
    pending: "⏳ Pending",
    approved: "✅ Approved",
    rejected: "❌ Rejected",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {labels[status] || status}
    </span>
  );
}

export function ScheduleBadge({ startTime, endTime }) {
  const scheduleStatus = getScheduleStatus(startTime, endTime);
  const styles = getScheduleStatusStyles(scheduleStatus);
  const labels = {
    scheduled: "🕐 Scheduled",
    active: "🔴 Live",
    expired: "⏹ Expired",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {labels[scheduleStatus]}
    </span>
  );
}
