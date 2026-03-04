import React, { useState } from "react";
import { FieldInput } from "../../ui/FieldInput";
import { Spinner } from "../../ui/Spinner";
import "./CreatePost.css";

interface CreatePostProps {
  onCreate: (title: string, content: string) => Promise<void>;
}

/** Form card that lets the user write and submit a new post */
export const CreatePost: React.FC<CreatePostProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && !loading;

  /** Submits the post if both fields are filled, then clears the inputs */
  const handleCreate = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await onCreate(title.trim(), content.trim());
      setTitle("");
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card fade-up create-post-container">
      <div className="create-post-header">
        <h2 className="create-post-title">What's on your mind?</h2>
      </div>

      <div className="card-body">
        <FieldInput
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Hello world"
        />
        <FieldInput
          label="Content"
          value={content}
          onChange={setContent}
          placeholder="Content here"
          multiline
        />
        <div className="create-post-actions">
          <button
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={!canSubmit}
          >
            {loading ? (
              <>
                <Spinner size={15} color="white" /> Creating…
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
