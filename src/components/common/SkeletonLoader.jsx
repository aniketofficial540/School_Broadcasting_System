import React from "react";

export function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <SkeletonBlock className="h-4 w-24 mb-3" />
      <SkeletonBlock className="h-8 w-16 mb-2" />
      <SkeletonBlock className="h-3 w-32" />
    </div>
  );
}

export function SkeletonContentCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <SkeletonBlock className="h-40 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
        <SkeletonBlock className="h-3 w-full" />
        <div className="flex gap-2 pt-1">
          <SkeletonBlock className="h-6 w-20" />
          <SkeletonBlock className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr>
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-4 py-3">
          <SkeletonBlock className="h-4" />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonContentCard key={i} />
      ))}
    </div>
  );
}
