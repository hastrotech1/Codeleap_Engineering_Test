import type {
  ApiResponse,
  CreatePostPayload,
  UpdatePostPayload,
  Post,
} from "../types";

export const BASE_URL = "https://dev.codeleap.co.uk/careers/";

/** Fetches a page of posts from the given URL and returns the API response */
export async function fetchPosts(url: string): Promise<ApiResponse> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Sends a new post to the API and returns the created post object */
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Updates an existing post by ID with new title/content and returns the updated post */
export async function updatePost(
  id: number,
  payload: UpdatePostPayload,
): Promise<Post> {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Deletes a post by ID from the API */
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
