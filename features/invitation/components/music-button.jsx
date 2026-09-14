"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function MusicButton({ isPlaying, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={cn(
        "fixed bottom-24 right-5 z-50 flex h-11 w-11 items-center justify-center",
        "rounded-full border border-rose-line/60 bg-dusty text-white shadow-[0_10px_24px_-10px_rgba(154,83,104,0.6)]",
      )}
    >
      {isPlaying && (
        <motion.span
          animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-dusty"
        />
      )}
      <span className="relative flex items-center justify-center">
        {isPlaying ? (
          <svg
            className="h-5 w-5"
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
      </span>
    </motion.button>
  );
}