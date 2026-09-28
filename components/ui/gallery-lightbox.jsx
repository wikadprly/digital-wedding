"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 500;

export default function GalleryLightbox({ images, index, onClose, onIndexChange }) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isOpen = index !== null;

  const total = images.length;
  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, onIndexChange, total]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % total);
  }, [index, onIndexChange, total]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery.viewer")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-burgundy/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <span className="font-serif text-sm tracking-[0.2em] text-ivory/80">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("gallery.close")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goPrev();
                  }}
                  aria-label={t("gallery.previous")}
                  className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goNext();
                  }}
                  aria-label={t("gallery.next")}
                  className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={images[index].src}
                drag={shouldReduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 32 }
                }
                onDragEnd={(_event, info) => {
                  const { offset, velocity } = info;
                  if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
                    goNext();
                  } else if (
                    offset.x > SWIPE_DISTANCE ||
                    velocity.x > SWIPE_VELOCITY
                  ) {
                    goPrev();
                  }
                }}
                onClick={(event) => event.stopPropagation()}
                className="relative h-full w-full touch-pan-y select-none"
              >
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  draggable={false}
                  priority
                  sizes="100vw"
                  className="pointer-events-none object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 px-4 pb-6 pt-3">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onIndexChange(i);
                }}
                aria-label={`${t("gallery.goTo")} ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-ivory" : "w-1.5 bg-ivory/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
