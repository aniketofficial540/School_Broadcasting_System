import { MOCK_CONTENT } from "../data/mockData";

let contentStore = [...MOCK_CONTENT];

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAllContent() {
  await delay();
  return [...contentStore];
}

export async function getContentByTeacher(teacherId) {
  await delay();
  return contentStore.filter((item) => item.teacherId === teacherId);
}

export async function getPendingContent() {
  await delay();
  return contentStore.filter((item) => item.status === "pending");
}

export async function getActiveContentByTeacher(teacherId) {
  await delay();
  const now = new Date();

  return contentStore.filter((item) => {
    if (item.teacherId !== teacherId) return false;
    if (item.status !== "approved") return false;

    const start = new Date(item.startTime);
    const end = new Date(item.endTime);

    return now >= start && now <= end;
  });
}

export async function uploadContent(contentData) {
  await delay(800);

  const newItem = {
    id: "content-" + Date.now(),
    status: "pending",
    rejectionReason: null,
    uploadedAt: new Date().toISOString(),
    ...contentData,
  };

  contentStore = [newItem, ...contentStore];

  return newItem;
}

export async function getContentById(id) {
  await delay(300);
  const item = contentStore.find((c) => c.id === id);
  if (!item) throw new Error("Content not found");
  return { ...item };
}

export function updateContentStatus(id, status, rejectionReason = null) {
  contentStore = contentStore.map((item) => {
    if (item.id === id) {
      return { ...item, status, rejectionReason };
    }
    return item;
  });
}
