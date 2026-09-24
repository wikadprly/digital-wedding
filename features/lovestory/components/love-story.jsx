"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMotionPreset, staggerContainer } from "@/lib/motion";
import Reveal from "@/components/ui/reveal";

const STORY_TIMELINE = [
  {
    year: "2023",
    title: "Awal Bertemu",
    description:
      "Berawal dari sapaan sederhana, dua insan mulai saling mengenal dan menemukan kenyamanan dalam setiap cerita yang dijalani bersama.",
  },
  {
    year: "2025",
    title: "Menjalin Hubungan",
    description:
      "Hari demi hari berlalu, kami sering merencanakan makan bersama setiap libur kerja. Tak terasa, hal itu tumbuh menjadi hubungan yang penuh tawa dan saling dukung. Sebuah pertemuan yang tak pernah disangka, hingga akhirnya membawa kami berkomitmen untuk menjalin hubungan ke jenjang lebih serius — pada 25 Oktober 2025, kami telah melangsungkan acara lamaran.",
  },
  {
    year: "2026",
    title: "Menuju Hari Bahagia",
    description:
      "Dengan penuh rasa syukur, kami melangkah ke babak baru dalam sebuah ikatan suci pernikahan.",
  },
];

function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />;
}

export default function LoveStory() {
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");

  return (
    <section
      id="lovestory"
      className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-ivory px-6 pb-28 pt-16"
    >
      {/* dekorasi atas dari gambar atasP3 — turun pelan dari atas sekali lalu berhenti */}
      <motion.div
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center"
      >
        <Image
          src="/jawa/P3header.png"
          alt=""
          width={1080}
          height={1206}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* dekorasi bawah dari gambar bawahP3 — muncul pelan dari bawah sekali lalu berhenti */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
      >
        <Image
          src="/jawa/P3footer.png"
          alt=""
          width={1080}
          height={1080}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      <Botanical className="pointer-events-none absolute -left-8 top-40 h-40 w-40 opacity-[0.08]" />

      <Reveal
        variants={staggerContainer()}
        amount={0.55}
        className="relative z-10"
      >
        <div className="text-center">
          <motion.h2
            variants={fadeUp}
            className="font-serif text-2xl uppercase tracking-[0.22em] text-burgundy"
          >
            Our Story
          </motion.h2>
          <motion.div
            variants={fade}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-champagne" />
            <Diamond />
            <span className="h-px w-8 bg-champagne" />
          </motion.div>
        </div>

        <motion.p
          variants={fade}
          className="mx-auto mt-6 max-w-xs text-center text-sm italic leading-relaxed text-brown-mute"
        >
          Tidak ada yang kebetulan di dunia ini. Kami dipertemukan oleh waktu,
          dipersatukan oleh cerita, dan dipertahankan oleh doa.
        </motion.p>

        <div className="relative mx-auto mt-12 max-w-md">
          {/* vertical line */}
          <span className="absolute left-4 top-0 h-full w-px bg-rose-line" />

          {STORY_TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              variants={fadeUp}
              custom={i}
              className="relative mb-10 pl-12 last:mb-0"
            >
              <span className="absolute left-[11px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-burgundy bg-rosy" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">
                {item.year}
              </p>
              <h3 className="mt-1 font-serif text-xl text-burgundy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown-mute">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fade}
          className="mx-auto mt-12 max-w-sm text-center font-script text-3xl leading-snug text-burgundy"
        >
          &ldquo;Two souls, one journey, forever begins here.&rdquo;
        </motion.p>
      </Reveal>
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