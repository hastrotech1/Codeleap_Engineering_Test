import type {
  ApiResponse,
  CreatePostPayload,
  UpdatePostPayload,
  Post,
} from "../types";

// ─── Base URL ────────────────────────────────────────────────────────────────
// When the API is ready, this is the only URL you need — all functions below
// already target it. Just uncomment the real fetch blocks and remove the mocks.
export const BASE_URL = "https://dev.codeleap.co.uk/careers/";

// ─── Mock store (temporary — remove when API is live) ────────────────────────
let _mockPosts: Post[] = [
  {
    id: 1,
    username: "alice",
    created_datetime: new Date(Date.now() - 3600 * 1000).toISOString(),
    title: "Hello world",
    content: "This is a placeholder post while the API is being set up.",
  },
  {
    id: 2,
    username: "bob",
    created_datetime: new Date(Date.now() - 7200 * 1000).toISOString(),
    title: "Another post",
    content: "More placeholder content.",
  },
];
let _mockNextId = 3;

// ─── GET /careers/ ───────────────────────────────────────────────────────────
/** Fetches a page of posts from the given URL and returns the API response */
export async function fetchPosts(_url: string): Promise<ApiResponse> {
  // TODO: Uncomment the block below and remove the mock return when API is ready
  //
  // const res = await fetch(_url);
  // if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // return res.json();

  // ── Mock (remove when API is live) ──
  return {
    count: _mockPosts.length,
    next: null,
    previous: null,
    results: [..._mockPosts].reverse(),
  };
}

// ─── POST /careers/ ──────────────────────────────────────────────────────────
/** Sends a new post to the API and returns the created post object */
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  // TODO: Uncomment the block below and remove the mock return when API is ready
  //
  // const res = await fetch(BASE_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),   // { username, title, content }
  // });
  // if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // return res.json();

  // ── Mock (remove when API is live) ──
  const post: Post = {
    id: _mockNextId++,
    username: payload.username,
    title: payload.title,
    content: payload.content,
    created_datetime: new Date().toISOString(),
  };
  _mockPosts.push(post);
  return post;
}

// ─── PATCH /careers/{id}/ ────────────────────────────────────────────────────
/** Updates an existing post by ID with new title/content and returns the updated post */
export async function updatePost(
  id: number,
  payload: UpdatePostPayload,
): Promise<Post> {
  // TODO: Uncomment the block below and remove the mock return when API is ready
  //
  // const res = await fetch(`${BASE_URL}${id}/`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),   // { title, content }  — id/username/created_datetime are read-only
  // });
  // if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // return res.json();

  // ── Mock (remove when API is live) ──
  const idx = _mockPosts.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`Post ${id} not found`);
  _mockPosts[idx] = { ..._mockPosts[idx], ...payload };
  return _mockPosts[idx];
}

// ─── DELETE /careers/{id}/ ───────────────────────────────────────────────────
/** Deletes a post by ID from the API — the server returns nothing on success */
export async function deletePost(id: number): Promise<void> {
  // TODO: Uncomment the block below and remove the mock return when API is ready
  //
  // const res = await fetch(`${BASE_URL}${id}/`, { method: "DELETE" });
  // if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // ── Mock (remove when API is live) ──
  _mockPosts = _mockPosts.filter((p) => p.id !== id);
}
