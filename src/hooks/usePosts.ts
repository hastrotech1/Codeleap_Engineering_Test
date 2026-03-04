import { useState, useEffect, useRef, useCallback } from "react";
import type { Post, CreatePostPayload, UpdatePostPayload } from "../types";
import {
  fetchPosts as apiFetch,
  createPost as apiCreate,
  updatePost as apiUpdate,
  deletePost as apiDelete,
  BASE_URL,
} from "../lib/api";

const INITIAL_URL = `${BASE_URL}?limit=10&offset=0`;

/** Hook that fetches posts from the API, supports infinite scroll, and exposes create/update/delete actions */
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  /** Fetches posts from the given URL; if append is true, adds them to the existing list instead of replacing it */
  const load = useCallback(async (url: string, append = false) => {
    setLoading(true);
    setError(false);
    try {
      const data = await apiFetch(url);
      setPosts((prev) => (append ? [...prev, ...data.results] : data.results));
      setNextUrl(data.next);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Refreshes the post list from the beginning, discarding any previously loaded pages */
  const reload = () => load(INITIAL_URL, false);

  // Initial fetch
  useEffect(() => {
    load(INITIAL_URL, false);
  }, [load]);

  // Infinite scroll observer
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextUrl && !loading) load(nextUrl, true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [nextUrl, loading, load]);

  /** Sends a new post to the API and adds it to the top of the list */
  const createPost = async (payload: CreatePostPayload) => {
    const post = await apiCreate(payload);
    setPosts((prev) => [post, ...prev]);
  };

  /** Saves edited title/content for a post and updates it in the list */
  const updatePost = async (id: number, payload: UpdatePostPayload) => {
    const updated = await apiUpdate(id, payload);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  /** Deletes a post from the API and removes it from the list */
  const deletePost = async (id: number) => {
    await apiDelete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    posts,
    loading,
    error,
    nextUrl,
    loaderRef,
    reload,
    createPost,
    updatePost,
    deletePost,
  };
}
