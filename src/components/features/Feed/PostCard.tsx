import React from "react";
import { Trash2, Pencil, Heart } from "lucide-react";
import { Avatar } from "../../ui/Avatar";
import { timeAgo } from "../../../lib/utils";
import type { Post } from "../../../types";
import "./PostCard.css";

interface PostCardProps {
  post: Post;
  currentUser: string;
  isLiked: boolean;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  isLiked,
  onLike,
  onDelete,
  onEdit,
}) => {
  const isOwn = post.username === currentUser;

  return (
    <article className="card fade-up stagger-item post-card">
      {/* ── Header ── */}
      <div className="card-header">
        <h3 className="card-title">{post.title}</h3>
        {isOwn && (
          <div className="post-card-actions">
            <button
              className="icon-btn"
              onClick={() => onDelete(post.id)}
              title="Delete post"
            >
              <Trash2 size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={() => onEdit(post)}
              title="Edit post"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="card-body">
        {/* Meta row */}
        <div className="post-card-meta">
          <div className="post-card-author">
            <Avatar name={post.username} />
            <span className="post-card-username">@{post.username}</span>
            {isOwn && <span className="you-badge">You</span>}
          </div>
          <span className="post-card-timestamp">
            {timeAgo(post.created_datetime)}
          </span>
        </div>

        {/* Content */}
        <p className="post-card-content">{post.content}</p>

        {/* Like action */}
        <hr className="post-card-divider" />
        <div className="post-card-actions-footer">
          <button
            className={`like-btn${isLiked ? " liked" : ""}`}
            onClick={() => onLike(post.id)}
          >
            <Heart
              size={14}
              className="heart"
              fill={isLiked ? "#ec4899" : "none"}
              strokeWidth={isLiked ? 0 : 2}
            />
            {isLiked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
    </article>
  );
};
