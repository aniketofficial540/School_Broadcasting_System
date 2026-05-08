import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPendingContent } from "../../services/content.service";
import { approveContent, rejectContent } from "../../services/approval.service";
import { EmptyState } from "../../components/common/EmptyState";
import { SkeletonGrid } from "../../components/common/SkeletonLoader";
import { Modal } from "../../components/common/Modal";
import { Button } from "../../components/common/Button";
import { Pagination, usePagination } from "../../components/common/Pagination";
import { formatDate, getScheduleStatus } from "../../utils/helpers";
import { ScheduleBadge } from "../../components/common/Badge";

export default function PendingApprovalsPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actioningId, setActioningId] = useState(null);

  const [rejectModal, setRejectModal] = useState({ open: false, item: null });
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [rejecting, setRejecting] = useState(false);

  async function loadContent() {
    try {
      setLoading(true);
      const data = await getPendingContent();
      setContent(data);
    } catch (err) {
      setError("Failed to load pending content.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(content, 6);

  async function handleApprove(item) {
    setActioningId(item.id);
    try {
      await approveContent(item.id);
      toast.success(`"${item.title}" has been approved! ✅`);
      setContent((prev) => prev.filter((c) => c.id !== item.id));
    } catch (err) {
      toast.error("Failed to approve. Please try again.");
    } finally {
      setActioningId(null);
    }
  }

  function openRejectModal(item) {
    setRejectModal({ open: true, item });
    setRejectReason("");
    setRejectError("");
  }

  async function handleRejectConfirm() {
    if (!rejectReason.trim()) {
      setRejectError("Please enter a rejection reason.");
      return;
    }
    setRejecting(true);
    try {
      await rejectContent(rejectModal.item.id, rejectReason);
      toast.success(`"${rejectModal.item.title}" has been rejected.`);
      setContent((prev) => prev.filter((c) => c.id !== rejectModal.item.id));
      setRejectModal({ open: false, item: null });
    } catch (err) {
      toast.error(err.message || "Failed to reject.");
    } finally {
      setRejecting(false);
    }
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Pending Approvals</h1>
        <p className="text-gray-500 mt-1">
          {loading ? "Loading..." : `${content.length} item${content.length !== 1 ? "s" : ""} waiting for your review`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
          <button onClick={loadContent} className="text-red-600 text-sm underline mt-1">Try again</button>
        </div>
      )}

      {loading ? (
        <SkeletonGrid count={6} />
      ) : content.length === 0 ? (
        <EmptyState
          icon="🎉"
          title="All caught up!"
          message="There's no pending content to review right now. Check back later."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentItems.map((item) => (
              <PendingContentCard
                key={item.id}
                item={item}
                onApprove={() => handleApprove(item)}
                onReject={() => openRejectModal(item)}
                isActioning={actioningId === item.id}
              />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}

      <Modal
        isOpen={rejectModal.open}
        onClose={() => !rejecting && setRejectModal({ open: false, item: null })}
        title="Reject Content"
      >
        {rejectModal.item && (
          <div>
            <p className="text-gray-600 text-sm mb-1">
              You are rejecting: <strong>{rejectModal.item.title}</strong>
            </p>
            <p className="text-gray-500 text-xs mb-4">
              The teacher will see your reason, so be clear and helpful.
            </p>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                setRejectError("");
              }}
              placeholder="e.g. The image quality is too low. Please upload a clearer version..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none
                ${rejectError ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-200"}`}
            />
            {rejectError && <p className="text-red-500 text-xs mt-1">{rejectError}</p>}

            <div className="flex gap-3 mt-4">
              <Button
                variant="danger"
                onClick={handleRejectConfirm}
                loading={rejecting}
                className="flex-1"
              >
                {rejecting ? "Rejecting..." : "❌ Confirm Rejection"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setRejectModal({ open: false, item: null })}
                disabled={rejecting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function PendingContentCard({ item, onApprove, onReject, isActioning }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden fade-in">
      <div className="relative h-48 bg-gray-100">
        <img
          src={item.fileUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Preview+Unavailable";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full">
            ⏳ Pending Review
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 font-display text-base mb-1">{item.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {item.subject}
          </span>
          <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
        </div>

        {item.description && (
          <p className="text-gray-500 text-xs mb-3">{item.description}</p>
        )}

        <div className="text-xs text-gray-400 space-y-0.5 mb-3">
          <div>👤 Uploaded by: <span className="text-gray-600">{item.teacherName}</span></div>
          <div>📅 Uploaded: {formatDate(item.uploadedAt)}</div>
          <div>▶ Start: {formatDate(item.startTime)}</div>
          <div>⏹ End: {formatDate(item.endTime)}</div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-50">
          <Button
            variant="success"
            size="sm"
            onClick={onApprove}
            loading={isActioning}
            className="flex-1"
          >
            ✅ Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onReject}
            disabled={isActioning}
            className="flex-1"
          >
            ❌ Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
