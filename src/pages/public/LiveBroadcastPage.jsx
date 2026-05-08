import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActiveContentByTeacher } from "../../services/content.service";
import { EmptyState } from "../../components/common/EmptyState";
import { formatDate } from "../../utils/helpers";

export default function LiveBroadcastPage() {
  const { teacherId } = useParams();

  const [activeContent, setActiveContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);

  async function loadContent() {
    try {
      setError(null);
      setLoading(true);
      const data = await getActiveContentByTeacher(teacherId);
      setActiveContent(data);
      setCurrentIndex(0);
      setLastRefreshed(new Date());
    } catch {
      setActiveContent([]);
      setError("Failed to load broadcast content.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, [teacherId]);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      loadContent();
    }, 60 * 1000);

    return () => clearInterval(refreshTimer);
  }, [teacherId]);

  useEffect(() => {
    if (activeContent.length <= 1) return;

    const currentItem = activeContent[currentIndex];
    if (!currentItem) return;

    const rotationSeconds = Number(currentItem.rotationDuration) || 10;
    const rotationTimer = setTimeout(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % activeContent.length);
    }, Math.max(rotationSeconds, 5) * 1000);

    return () => clearTimeout(rotationTimer);
  }, [activeContent, currentIndex]);

  const currentItem = activeContent[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              Public Live Page
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 font-display sm:text-3xl">
              Currently Active Content
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              View the active broadcast for this teacher without signing in.
            </p>
          </div>

          {!loading && !error && activeContent.length > 0 && (
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live now
            </div>
          )}
        </div>

        <main className="flex flex-1 items-center justify-center py-8 sm:py-10">
        {loading ? (
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
            <p className="text-lg font-semibold text-slate-900">Loading broadcast...</p>
            <p className="mt-2 text-sm text-slate-500">Checking for active content right now.</p>
          </div>
        ) : error ? (
          <div className="w-full max-w-xl rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-600">
              !
            </div>
            <p className="text-lg font-semibold text-slate-900">Something went wrong</p>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
            <button
              onClick={loadContent}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Try again
            </button>
          </div>
        ) : activeContent.length === 0 ? (
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-sm">
            <EmptyState
              icon="📭"
              title="No content available"
              message="There is no active broadcast content right now."
            />
          </div>
        ) : (
          <div className="w-full max-w-5xl fade-in">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-slate-950 p-3 sm:p-4 lg:p-6">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      Live
                    </div>
                    {currentItem.fileUrl ? (
                      <img
                        src={currentItem.fileUrl}
                        alt={currentItem.title}
                        className="aspect-video h-full w-full object-contain bg-slate-900"
                        onError={(event) => {
                          event.currentTarget.src = "https://via.placeholder.com/1200x675?text=Preview+Unavailable";
                        }}
                      />
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-slate-900 text-slate-400">
                        Preview unavailable
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
                      Active content
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-900 font-display sm:text-3xl">
                      {currentItem.title}
                    </h2>
                    <div className="mt-4 inline-flex rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
                      {currentItem.subject}
                    </div>

                    {currentItem.description && (
                      <p className="mt-5 text-sm leading-6 text-slate-600 sm:text-[15px]">
                        {currentItem.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span>Preview</span>
                      <span className="font-medium text-slate-900">Visible to everyone</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span>Updated</span>
                      <span className="font-medium text-slate-900">
                        {formatDate(lastRefreshed.toISOString())}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span>Auto-refresh</span>
                      <span className="font-medium text-slate-900">Every 60 seconds</span>
                    </div>
                    {activeContent.length > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <span>Rotation</span>
                        <span className="font-medium text-slate-900">
                          {currentIndex + 1} of {activeContent.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
