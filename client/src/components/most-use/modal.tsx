import React from "react";
import ModalPortal from "./modal-portal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { setPortalModalClose } from "@/lib/store/additionals/portal-modal/portal-modal-slice";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isPortalOpen } = useSelector((state: RootState) => state.portalModal);
  const dispatch: AppDispatch = useDispatch();
  if (!isPortalOpen) return null;

  return (
    <ModalPortal>
      {/* Backdrop */}
      <div
        className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-[9999] h-dvh overflow-hidden"
        onClick={() => dispatch(setPortalModalClose())}
      >
        {/* Modal box */}
        <div
          className="relative  backdrop-blur-md w-[90%] "
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
