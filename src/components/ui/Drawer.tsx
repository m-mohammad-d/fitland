"use client";
import { useEffect, useRef } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Drawer({ isOpen, onClose, children, title }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div
        ref={drawerRef}
        className="absolute right-0 bottom-0 left-0 rounded-t-2xl bg-white shadow-xl"
        style={{
          maxHeight: "80vh",
          animation: "slideUp 0.3s ease-out forwards",
        }}
      >
        <div className="flex justify-center pt-2 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {title && (
          <div className="border-b border-gray-200 px-4 py-3">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          </div>
        )}

        <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(80vh - 60px)" }}>
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
