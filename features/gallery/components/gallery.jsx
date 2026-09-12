"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMotionPreset } from "@/lib/motion";

const GALLERY_IMAGES = [
  { src: "/couple.png", position: "object-top", delay: 0 },
  { src: "/couple.png", position: "object-center", delay: 100 },
  { src: "/couple.png", position: "object-bottom", delay: 200 },
  { src: "/couple.png", position: "object-center", delay: 300 },
  { src: "/couple.png", position: "object-top", delay: 400 },
];

function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />;
}

export default function Gallery() {
  const scaleIn = useMotionPreset("scaleIn");
  const fadeUp = useMotionPreset("fadeUp");

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-dusty px-6 pb-28 pt-16"
    >
      <Botanical className="pointer-events-none absolute -left-10 bottom-24 h-40 w-40 -scale-x-100 opacity-[0.1]" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 text-center"
      >
        <h2 className="font-serif text-2xl uppercase tracking-[0.22em] text-ivory">
          Our Gallery
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-champagne" />
          <Diamond />
          <span className="h-px w-8 bg-champagne" />
        </div>
        <p className="mx-auto mt-4 max-w-xs font-script text-3xl leading-snug text-ivory">
          Sebentuk kenangan kecil yang ingin kami bagikan.
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative w-full overflow-hidden rounded-[16px] border border-ivory/30 bg-rosy shadow-[0_14px_28px_-18px_rgba(74,52,56,0.45)] ${
              i === 0 ? "col-span-2 h-64" : "h-44"
            }`}
          >
            <Image
              src={img.src}
              alt={`Gallery ${i + 1}`}
              fill
              sizes={
                i === 0
                  ? "(max-width: 768px) calc(100vw - 48px), 448px"
                  : "(max-width: 768px) 50vw, 320px"
              }
              className={`object-cover transition-transform duration-700 hover:scale-105 ${img.position}`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Botanical({ className }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} style={{ color: "#F7F2EC" }} aria-hidden>
      <path
        d="M8 8c14 2 30 10 38 24 6 11 6 24-2 32-7 7-19 6-24-2-4-7-2-16 6-19"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 8c2 18 10 36 26 46 12 8 27 9 36 1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="46" cy="34" r="2.5" fill="currentColor" />
    </svg>
  );
}