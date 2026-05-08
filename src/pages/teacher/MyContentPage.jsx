import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getContentByTeacher } from "../../services/content.service";
import { ContentCard } from "../../components/common/ContentCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SkeletonGrid } from "../../components/common/SkeletonLoader";
import { Pagination, usePagination } from "../../components/common/Pagination";
import { Button } from "../../components/common/Button";

export default function MyContentPage() {
  const { user } = useAuth();

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getContentByTeacher(user.teacherId);
        setContent(data);
      } catch (err) {
        setError("Failed to load content. Please refresh.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.teacherId]);

  const filteredContent = content.filter((item) => {
    if (statusFilter === "all") return true;
    return item.status === statusFilter;
  });

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(filteredContent, 6);

  const filterButtons = [
    { value: "all", label: "All", count: content.length },
    { value: "pending", label: "Pending", count: content.filter((c) => c.status === "pending").length },
    { value: "approved", label: "Approved", count: content.filter((c) => c.status === "approved").length },
    { value: "rejected", label: "Rejected", count: content.filter((c) => c.status === "rejected").length },
  ];

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">My Content</h1>
          <p className="text-gray-500 mt-1">All your uploaded educational content</p>
        </div>
        <Link to="/teacher/upload">
          <Button variant="primary">📤 Upload New</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => { setStatusFilter(btn.value); goToPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${statusFilter === btn.value
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
          >
            {btn.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs
              ${statusFilter === btn.value ? "bg-blue-500" : "bg-gray-100 text-gray-500"}`}>
              {btn.count}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : filteredContent.length === 0 ? (
        <EmptyState
          icon={statusFilter === "all" ? "📂" : "🔍"}
          title={statusFilter === "all" ? "No content yet" : `No ${statusFilter} content`}
          message={
            statusFilter === "all"
              ? "Upload your first content to get started!"
              : `You don't have any ${statusFilter} content right now.`
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
          <p className="text-center text-xs text-gray-400 mt-2">
            Showing {currentItems.length} of {filteredContent.length} items
          </p>
        </>
      )}
    </div>
  );
}
