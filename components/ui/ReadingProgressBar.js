"use client";

import { useEffect, useState, useCallback } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const calculateProgress = useCallback(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (scrollHeight <= 0) return;

    const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    setProgress(pct);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    window.addEventListener("scroll", calculateProgress, { passive: true });
    calculateProgress();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", calculateProgress);
    };
  }, [calculateProgress]);

  return (
    <>
      {/* Bar track */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
            zIndex: 99999, // higher than your navbar
          background: "rgba(0, 0, 0, 0.12)",
          pointerEvents: "none",
        }}
      >
        {/* Glowing filled bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
          style={{
            height: "100%",
            width: mounted ? `${progress}%` : "0%",
            background:
              "linear-gradient(90deg, #f97316 0%, #fb923c 60%, #fdba74 100%)",
            boxShadow:
              progress > 1
                ? "0 0 8px 2px rgba(249,115,22,0.8), 0 0 20px 4px rgba(249,115,22,0.4)"
                : "none",
            transition: mounted
              ? "width 0.15s ease-out, box-shadow 0.3s ease"
              : "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            borderRadius: "0 2px 2px 0",
            position: "relative",
          }}
        >
          {/* Leading glow dot */}
          {progress > 1 && progress < 99.5 && (
            <div
              style={{
                position: "absolute",
                right: -3,
                top: "50%",
                transform: "translateY(-50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #fff 0%, #fb923c 40%, transparent 100%)",
                boxShadow:
                  "0 0 6px 3px rgba(249,115,22,0.9), 0 0 14px 6px rgba(249,115,22,0.4)",
              }}
            />
          )}
        </div>
      </div>

      {/* Percentage label */}
      {progress > 0 && progress < 100 && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 16,
              zIndex: 99998, // higher than your navbar
            fontFamily: "'DM Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#f97316",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(249,115,22,0.35)",
            borderRadius: "4px",
            padding: "3px 8px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
            boxShadow: "0 0 8px rgba(249,115,22,0.2)",
          }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </>
  );
}
