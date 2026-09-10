"use client";

import { motion } from "motion/react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset, staggerContainer } from "@/lib/motion";

const QURAN_VERSE =
  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.";
const QURAN_REF = "( QS. Ar-Rum 21 )";

function SectionHeading({ title }) {
  return (
    <div className="text-center">
      <h2 className="font-serif text-2xl uppercase tracking-[0.22em] text-dusty">
        {title}
      </h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-champagne" />
        <Diamond />
        <span className="h-px w-8 bg-champagne" />
      </div>
    </div>
  );
}

function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />;
}

function Portrait({ initial }) {
  return (
    <div className="relative mx-auto h-36 w-28 overflow-hidden rounded-full border-2 border-blush bg-blush/35 shadow-[0_14px_30px_-18px_rgba(154,83,104,0.5)]">
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-serif text-6xl text-dusty">{initial}</span>
      </div>
    </div>
  );
}

function Person({ name, parent, prefix }) {
  return (
    <div className="text-center">
      <Portrait initial={(name || "?")[0]} />
      <h3 className="mt-5 font-serif text-4xl font-semibold text-dusty">{name}</h3>
      <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-brown-mute">
        {prefix} dari {parent}
      </p>
    </div>
  );
}

export default function Profile() {
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");

  if (!config) return null;

  const groom = config.groomName || "Rizal";
  const bride = config.brideName || "Rema";
  const parentGroom = config.parentGroom || "Bapak Rizal & Ibu Rizal";
  const parentBride = config.parentBride || "Bapak Rema & Ibu Rema";

  return (
    <section id="profile" className="relative overflow-hidden bg-ivory px-6 py-16">
      <Botanical className="pointer-events-none absolute -right-8 top-24 h-40 w-40 -scale-x-100 opacity-[0.08]" />
      <Botanical className="pointer-events-none absolute -left-8 bottom-16 h-40 w-40 opacity-[0.08]" />

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10"
      >
        <SectionHeading title="Bride & Groom" />

        {/* verse */}
        <motion.div
          variants={fade}
          className="mx-auto mt-8 max-w-md rounded-2xl border border-rose-line bg-rosy p-6 text-center"
        >
          <p className="font-serif-alt text-[15px] italic leading-relaxed text-brown-mute">
            &ldquo;{QURAN_VERSE}&rdquo;
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-champagne">
            {QURAN_REF}
          </p>
        </motion.div>

        {/* groom */}
        <motion.div
          variants={fadeUp}
          className="mt-12"
        >
          <Person name={groom} parent={parentGroom} prefix="Putra" />
        </motion.div>

        {/* separator */}
        <motion.div
          variants={fade}
          className="my-10 flex items-center justify-center gap-4"
        >
          <span className="h-px w-14 bg-rose-line" />
          <span className="font-script text-5xl leading-none text-mute">&amp;</span>
          <span className="h-px w-14 bg-rose-line" />
        </motion.div>

        {/* bride */}
        <motion.div
          variants={fadeUp}
          className="mt-12"
        >
          <Person name={bride} parent={parentBride} prefix="Putri" />
        </motion.div>
      </motion.div>
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