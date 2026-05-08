import React, { useEffect, useState, useMemo } from "react";
import { getAllContent } from "../../services/content.service";
import { ContentCard } from "../../components/common/ContentCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SkeletonGrid } from "../../components/common/SkeletonLoader";
import { Pagination, usePagination } from "../../components/common/Pagination";

export default function AllContentPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllContent();
        setContent(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const statusMatch = statusFilter === "all" || item.status === statusFilter;

      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.teacherName.toLowerCase().includes(query);

      return statusMatch && searchMatch;
    });
  }, [content, statusFilter, searchQuery]);

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(filteredContent, 6);

  const filterButtons = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-display">All Content</h1>
        <p className="text-gray-500 mt-1">Browse and filter all uploaded content from all teachers</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); goToPage(1); }}
            placeholder="Search by title, subject, or teacher..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => { setStatusFilter(btn.value); goToPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                ${statusFilter === btn.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {!loading && (
        <p className="text-sm text-gray-500 mb-4">
          {filteredContent.length === content.length
            ? `${content.length} total items`
            : `${filteredContent.length} of ${content.length} items match your filters`}
        </p>
      )}

      {loading ? (
        <SkeletonGrid count={6} />
      ) : filteredContent.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No results found"
          message="Try adjusting your search or filter to find what you're looking for."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          <p className="text-center text-xs text-gray-400 mt-2">
            Showing {currentItems.length} of {filteredContent.length} items
          </p>
        </>
      )}
    </div>
  );
}
