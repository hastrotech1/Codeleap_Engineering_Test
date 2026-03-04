import React, { useState } from "react";
import { Modal } from "../../ui/Modal";
import { FieldInput } from "../../ui/FieldInput";
import { Spinner } from "../../ui/Spinner";
import type { Post } from "../../../types";

interface EditModalProps {
  post: Post;
  onSave: (id: number, title: string, content: string) => Promise<void>;
  onClose: () => void;
}

/** Modal that lets the user edit the title and content of an existing post */
export const EditModal: React.FC<EditModalProps> = ({
  post,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const canSave =
    title.trim().length > 0 && content.trim().length > 0 && !loading;

  /** Saves the updated title and content to the API, then closes the modal */
  const handleSave = async () => {
    if (!canSave) return;
    setLoading(true);
    try {
      await onSave(post.id, title.trim(), content.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={() => !loading && onClose()}>
      <p className="modal-title">Edit item</p>

      <FieldInput
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="Hello world"
        autoFocus
      />
      <FieldInput
        label="Content"
        value={content}
        onChange={setContent}
        placeholder="Content here"
        multiline
      />

      <div className="modal-actions">
        <button
          className="btn btn-outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={handleSave}
          disabled={!canSave}
        >
          {loading ? (
            <>
              <Spinner size={15} color="white" /> Saving…
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </Modal>
  );
};
