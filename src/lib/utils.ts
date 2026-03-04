/** Converts an ISO date string into a human-readable "X minutes ago" style label */
export function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m > 1 ? "s" : ""} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

/** Generates a consistent HSL color for a given username, used for avatar backgrounds */
export function avatarColor(name: string): string {
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return `hsl(${hue},55%,55%)`;
}

/** Reads the user's liked post IDs from localStorage and returns them as a map */
export function getStoredLikes(): Record<number, boolean> {
  try {
    return JSON.parse(localStorage.getItem("cl_likes") ?? "{}");
  } catch {
    return {};
  }
}

/** Saves the current liked posts map to localStorage so it persists on refresh */
export function storeLikes(likes: Record<number, boolean>): void {
  localStorage.setItem("cl_likes", JSON.stringify(likes));
}

export const STORAGE_KEY_USER = "cl_user";
