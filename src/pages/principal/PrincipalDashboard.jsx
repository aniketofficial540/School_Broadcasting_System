import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllContent } from "../../services/content.service";
import { StatCard } from "../../components/common/StatCard";
import { SkeletonStatCard } from "../../components/common/SkeletonLoader";
import { StatusBadge } from "../../components/common/Badge";
import { formatDate, truncate } from "../../utils/helpers";
import { Button } from "../../components/common/Button";

export default function PrincipalDashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllContent();
        setContent(data);
      } catch (err) {
        setError("Failed to load content data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalCount = content.length;
  const pendingCount = content.filter((c) => c.status === "pending").length;
  const approvedCount = content.filter((c) => c.status === "approved").length;
  const rejectedCount = content.filter((c) => c.status === "rejected").length;

  const recentItems = [...content]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 5);

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">
          Welcome, {user.name.split(" ")[0]}! 🏫
        </h1>
        <p className="text-gray-500 mt-1">Here's an overview of all school content.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
        ) : (
          <>
            <StatCard title="Total Content" count={totalCount} icon="📦" color="blue" />
            <StatCard title="Pending Review" count={pendingCount} icon="⏳" color="yellow" description="Needs your attention" />
            <StatCard title="Approved" count={approvedCount} icon="✅" color="green" />
            <StatCard title="Rejected" count={rejectedCount} icon="❌" color="red" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/principal/pending"
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl p-5 flex items-center gap-4 transition-colors shadow-sm hover:shadow-md"
        >
          <div className="text-3xl">⏳</div>
          <div>
            <div className="font-semibold font-display">Review Pending Content</div>
            <div className="text-yellow-100 text-sm">
              {pendingCount} item{pendingCount !== 1 ? "s" : ""} awaiting approval
            </div>
          </div>
        </Link>
        <Link
          to="/principal/all-content"
          className="bg-white hover:bg-gray-50 border border-gray-100 text-gray-700 rounded-2xl p-5 flex items-center gap-4 transition-colors shadow-sm hover:shadow-md"
        >
          <div className="text-3xl">📋</div>
          <div>
            <div className="font-semibold font-display">View All Content</div>
            <div className="text-gray-400 text-sm">Browse, filter, and search everything</div>
          </div>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 font-display">Recent Uploads</h2>
          <Link to="/principal/all-content" className="text-blue-600 text-sm hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-16 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Content</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Teacher</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Uploaded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.fileUrl}
                            alt={item.title}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="font-medium text-gray-800">{truncate(item.title, 30)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{item.teacherName}</td>
                      <td className="px-4 py-3 text-gray-500">{item.subject}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(item.uploadedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
