import React from "react";

import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal background"
      />
      <div
        className="relative z-20 max-w-full max-h-full flex items-center justify-center"
        ref={modalRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button
          onClick={e => { e.stopPropagation(); onClose(); }}
          className="absolute top-2 right-2 z-30 bg-white/80 hover:bg-white rounded-full p-1 shadow text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          aria-label="Close"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
