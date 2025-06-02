"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="relative max-h-4/5 overflow-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onClose}
                className="focus:ring-primary-500 absolute top-4 left-4 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label="بستن"
              >
                <IoClose className="h-5 w-5" />
              </button>
              <div className="mt-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
