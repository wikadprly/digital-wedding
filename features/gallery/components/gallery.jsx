"use client";

import Image from "next/image";
import { useMotionPreset } from "@/lib/motion";
import Reveal from "@/components/ui/reveal";

const GALLERY_IMAGES = [
  { src: "/images/awal%20our%20galerry.JPG", position: "object-top", delay: 0 },
  { src: "/images/Salinan%20DSCF0077.JPG", position: "object-center", delay: 100 },
  { src: "/images/Salinan%20DSCF0105.JPG", position: "object-bottom", delay: 200 },
  { src: "/images/Salinan%20DSCF0118.JPG", position: "object-center", delay: 300 },
  { src: "/images/Salinan%20DSCF0122.JPG", position: "object-top", delay: 400 },
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
      className="relative mx-auto w-full max-w-[430px] overflow-hidden px-6 pb-64 pt-16"
    >
      <Botanical className="pointer-events-none absolute -left-10 bottom-24 h-40 w-40 -scale-x-100 opacity-[0.08]" />
      <Botanical className="pointer-events-none absolute -right-8 top-24 h-40 w-40 opacity-[0.08]" />

      <Reveal
        variants={fadeUp}
        amount={0.7}
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
      </Reveal>

      <div className="relative z-10 mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <Reveal
            key={i}
            variants={scaleIn}
            amount={0.85}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { type: "spring", stiffness: 280, damping: 20 },
            }}
            whileTap={{ scale: 0.97 }}
            className={`relative w-full overflow-hidden rounded-[16px] border border-burgundy/30 bg-rosy shadow-[0_14px_28px_-18px_rgba(74,52,56,0.45)] ${
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Botanical({ className }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} style={{ color: "#9A5368" }} aria-hidden>
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