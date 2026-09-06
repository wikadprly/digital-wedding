"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMotionPreset } from "@/lib/motion";

const GALLERY_IMAGES = [
  { src: "/couple.png", position: "object-top", delay: 0 },
  { src: "/couple.png", position: "object-center", delay: 100 },
  { src: "/couple.png", position: "object-bottom", delay: 200 },
  { src: "/couple.png", position: "object-center", delay: 300 },
];

export default function Gallery() {
  const scaleIn = useMotionPreset("scaleIn");

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-white px-6 py-16"
    >
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-40 opacity-10">
        <svg viewBox="0 0 80 160" fill="none" className="h-full w-full">
          <path d="M40 160C40 110 40 60 40 15" stroke="#7a1b3a" strokeWidth="2" />
          <path
            d="M40 30C28 28 18 34 14 50M40 40C50 36 58 42 62 58"
            stroke="#7a1b3a"
            strokeWidth="2"
          />
        </svg>
      </div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mb-10 text-center"
      >
        <h2 className="font-serif text-5xl text-[#7a1b3a]">Our Gallery</h2>
        <div className="mx-auto mt-4 h-px w-24 bg-[#7a1b3a]/20" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-3xl grid-cols-2 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative h-56 w-full overflow-hidden rounded-xl shadow-md"
          >
            <Image
              src={img.src}
              alt={`Gallery ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className={`object-cover ${img.position}`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
