import React from "react";
import { PostCard } from "./PostCard";
import { Spinner } from "../../ui/Spinner";
import type { Post } from "../../../types";
import "./PostList.css";

interface PostListProps {
  posts: Post[];
  currentUser: string;
  loading: boolean;
  hasMore: boolean;
  searchActive: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  isLiked: (postId: number) => boolean;
  onLike: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  currentUser,
  loading,
  hasMore,
  searchActive,
  loaderRef,
  isLiked,
  onLike,
  onDelete,
  onEdit,
}) => {
  if (!loading && posts.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🌐</div>
        <p>
          {searchActive
            ? "No posts match your search."
            : "No posts yet. Be the first to post!"}
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          isLiked={isLiked(post.id)}
          onLike={onLike}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      {/* Infinite scroll sentinel */}
      <div
        ref={loaderRef}
        className="post-list-loader"
      >
        {loading ? (
          <Spinner />
        ) : !hasMore && posts.length > 0 ? (
          <span className="caught-up-message">
            You're all caught up 🎉
          </span>
        ) : null}
      </div>
    </>
  );
};
