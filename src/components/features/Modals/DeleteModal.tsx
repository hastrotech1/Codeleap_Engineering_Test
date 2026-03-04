import React, { useState } from "react";
import { Modal } from "../../ui/Modal";
import { Spinner } from "../../ui/Spinner";

interface DeleteModalProps {
  postId: number;
  onConfirm: (id: number) => Promise<void>;
  onClose: () => void;
}

/** Modal that asks the user to confirm before permanently deleting a post */
export const DeleteModal: React.FC<DeleteModalProps> = ({
  postId,
  onConfirm,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  /** Calls the delete API for the post, then closes the modal when done */
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onConfirm(postId);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={() => !loading && onClose()}>
      <p className="modal-title">Are you sure you want to delete this item?</p>
      <div className="modal-actions">
        <button
          className="btn btn-outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size={15} color="white" /> Deleting…
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </Modal>
  );
};
