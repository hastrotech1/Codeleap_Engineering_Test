import React, { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

/** Base modal wrapper — renders a backdrop overlay and centres the modal panel. Closes when the user clicks outside or presses Escape */
export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  /** Listens for the Escape key and closes the modal when pressed */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
