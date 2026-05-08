import { updateContentStatus } from "./content.service";

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function approveContent(contentId) {
  await delay();
  updateContentStatus(contentId, "approved", null);
  return { success: true, message: "Content approved successfully!" };
}

export async function rejectContent(contentId, reason) {
  await delay();

  if (!reason || reason.trim() === "") {
    throw new Error("A rejection reason is required.");
  }

  updateContentStatus(contentId, "rejected", reason.trim());
  return { success: true, message: "Content rejected." };
}
