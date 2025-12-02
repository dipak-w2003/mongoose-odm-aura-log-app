import React from "react";
import ModalPortal from "./modal-portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* Backdrop */}
      <div
        className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-[9999] h-dvh"
        onClick={onClose}
      >
        {/* Modal box */}
        <div
          className="relative  backdrop-blur-md w-[90%]  h-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {/* <button
            onClick={onClose}
            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/60 backdrop-blur hover:bg-white/80 transition cursor-pointer text-black font-semibold"
          >
            ×
          </button> */}

          {children}
          {/* <section className="min-h-[600px]">{children}</section> */}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
