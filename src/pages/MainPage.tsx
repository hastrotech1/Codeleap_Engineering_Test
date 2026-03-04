import React, { useState } from "react";
import { AppHeader } from "../components/features/Feed/AppHeader";
import { CreatePost } from "../components/features/Feed/CreatePost";
import { FilterBar } from "../components/features/Feed/FilterBar";
import { PostList } from "../components/features/Feed/PostList";
import { DeleteModal } from "../components/features/Modals/DeleteModal";
import { EditModal } from "../components/features/Modals/EditModal";
import { usePosts } from "../hooks/usePosts";
import { useLikes } from "../hooks/useLikes";
import { usePostFilters } from "../hooks/usePostFilters";
import type { Post } from "../types";

interface MainPageProps {
  username: string;
  onLogout: () => void;
}

/** Main feed page — shows the create post form, search/sort bar, and the list of all posts */
const MainPage: React.FC<MainPageProps> = ({ username, onLogout }) => {
  const {
    posts,
    loading,
    error,
    nextUrl,
    loaderRef,
    reload,
    createPost,
    updatePost,
    deletePost,
  } = usePosts();
  const { isLiked, toggle: toggleLike } = useLikes();
  const { search, setSearch, sort, setSort, filtered } = usePostFilters(posts);

  // Modal state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editTarget, setEditTarget] = useState<Post | null>(null);

  /** Submits a new post using the current user's username */
  const handleCreate = (title: string, content: string) =>
    createPost({ username, title, content });

  /** Saves the edited title and content for a specific post */
  const handleSaveEdit = (id: number, title: string, content: string) =>
    updatePost(id, { title, content });

  return (
    <>
      <AppHeader username={username} onLogout={onLogout} />

      <main className="main-content">
        {/* Create post form */}
        <CreatePost onCreate={handleCreate} />

        {/* Search + sort */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Error state */}
        {error && (
          <div className="error-card">
            Failed to load posts.
            <button className="retry-link" onClick={reload}>
              Retry
            </button>
          </div>
        )}

        {/* Post list with infinite scroll */}
        {!error && (
          <PostList
            posts={filtered}
            currentUser={username}
            loading={loading}
            hasMore={!!nextUrl}
            searchActive={search.trim().length > 0}
            loaderRef={loaderRef}
            isLiked={isLiked}
            onLike={toggleLike}
            onDelete={setDeleteId}
            onEdit={setEditTarget}
          />
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteId !== null && (
        <DeleteModal
          postId={deleteId}
          onConfirm={deletePost}
          onClose={() => setDeleteId(null)}
        />
      )}

      {/* Edit modal */}
      {editTarget !== null && (
        <EditModal
          post={editTarget}
          onSave={handleSaveEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
    </>
  );
};

export default MainPage;
