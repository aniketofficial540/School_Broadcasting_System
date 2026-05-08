import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getContentByTeacher } from "../../services/content.service";
import { StatCard } from "../../components/common/StatCard";
import { SkeletonStatCard } from "../../components/common/SkeletonLoader";
import { EmptyState } from "../../components/common/EmptyState";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        const data = await getContentByTeacher(user.teacherId);
        setContent(data);
      } catch (err) {
        setError("Failed to load your content. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [user.teacherId]);

  const totalCount = content.length;
  const pendingCount = content.filter((c) => c.status === "pending").length;
  const approvedCount = content.filter((c) => c.status === "approved").length;
  const rejectedCount = content.filter((c) => c.status === "rejected").length;

  const recentContent = [...content]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 3);

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">
          Welcome back, {user.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's an overview of your content.</p>
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
            <StatCard title="Total Uploaded" count={totalCount} icon="📦" color="blue" />
            <StatCard title="Pending Review" count={pendingCount} icon="⏳" color="yellow" />
            <StatCard title="Approved" count={approvedCount} icon="✅" color="green" />
            <StatCard title="Rejected" count={rejectedCount} icon="❌" color="red" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/teacher/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 flex items-center gap-4 transition-colors shadow-sm hover:shadow-md"
        >
          <div className="text-3xl">📤</div>
          <div>
            <div className="font-semibold font-display">Upload New Content</div>
            <div className="text-blue-200 text-sm">Share a new educational image</div>
          </div>
        </Link>
        <Link
          to="/teacher/my-content"
          className="bg-white hover:bg-gray-50 border border-gray-100 text-gray-700 rounded-2xl p-5 flex items-center gap-4 transition-colors shadow-sm hover:shadow-md"
        >
          <div className="text-3xl">📚</div>
          <div>
            <div className="font-semibold font-display">View My Content</div>
            <div className="text-gray-400 text-sm">See all your uploaded items</div>
          </div>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 font-display">Recent Uploads</h2>
          <Link to="/teacher/my-content" className="text-blue-600 text-sm hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-16 rounded-xl" />
            ))}
          </div>
        ) : recentContent.length === 0 ? (
          <EmptyState
            icon="📂"
            title="No content uploaded yet"
            message="Start by uploading your first educational content!"
          />
        ) : (
          <div className="space-y-3">
            {recentContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm"
              >
                <img
                  src={item.fileUrl}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 text-sm truncate">{item.title}</div>
                  <div className="text-gray-400 text-xs">{item.subject}</div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0
                    ${item.status === "approved" ? "bg-green-100 text-green-700" :
                      item.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
