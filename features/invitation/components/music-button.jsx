"use client";

import { cn } from "@/lib/utils";

export default function MusicButton({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={cn(
        "fixed bottom-24 right-5 z-50 flex h-11 w-11 items-center justify-center",
        "rounded-full bg-[#7a1b3a] text-white shadow-lg hover:bg-[#8a2044]",
        "transition-transform",
      )}
    >
      {isPlaying ? (
        <svg
          className="h-5 w-5 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6l5-3-5-3z" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      )}
    </button>
  );
}
