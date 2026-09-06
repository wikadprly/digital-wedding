"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const QURAN_VERSE =
  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.";
const QURAN_REF = "( QS. Ar-Rum 21 )";

function Divider({ className }) {
  return (
    <svg
      viewBox="0 0 40 20"
      className={cn("h-8 text-[#e8c98a]", className)}
      fill="currentColor"
    >
      <path
        d="M20 2C14 2 8 7 6 13c2-3 8-3 12-.5 3-2.5 8-2.5 12 .5C32 7 26 2 20 2zM10 10l6 6M30 10l-6 6"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function Profile() {
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");

  const groom = useMemo(
    () => ({
      name: config.groomName || "Rizal",
      parent: config.parentGroom || "",
    }),
    [config],
  );

  const bride = useMemo(
    () => ({
      name: config.brideName || "Rema",
      parent: config.parentBride || "",
    }),
    [config],
  );

  if (!config) return null;

  return (
    <section id="profile" className="relative w-full">
      <div className="bg-gradient-to-b from-[#7a1b3a] via-[#8a2044] to-[#5c1029] pb-32 pt-16 text-center text-white">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={scaleIn}>
            <Divider className="mx-auto h-10" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-xl uppercase tracking-widest text-[#e8c98a]"
          >
            Our Special Day
          </motion.h2>
          <motion.p
            variants={fade}
            className="mx-auto mt-6 w-[85%] max-w-xl text-sm leading-relaxed text-rose-100/90"
          >
            &ldquo;{QURAN_VERSE}&rdquo;
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 italic text-rose-100/70"
          >
            {QURAN_REF}
          </motion.p>
        </motion.div>
      </div>

      <div
        className={cn(
          "relative -mt-24 rounded-t-[40px] bg-white px-6 py-14 text-center",
          "shadow-[0_-10px_20px_rgba(0,0,0,0.08)]",
        )}
      >
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pointer-events-none absolute -right-6 top-40 h-64 w-32 opacity-10"
        >
          <svg viewBox="0 0 80 160" fill="none" className="h-full w-full">
            <path
              d="M40 160C40 110 40 60 40 15"
              stroke="#7a1b3a"
              strokeWidth="2"
            />
            <path
              d="M40 30C28 28 18 34 14 50M40 40C50 36 58 42 62 58"
              stroke="#7a1b3a"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Mempelai Pria */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#7a1b3a]/10">
            <span className="font-serif text-5xl text-[#7a1b3a]">
              {groom.name[0]}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-4xl text-[#7a1b3a]">
            {groom.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {groom.parent}
          </p>
        </motion.div>

        {/* Pemisah '&' */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="my-8 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-[#7a1b3a]/20" />
          <span className="font-serif text-4xl text-[#7a1b3a]">&</span>
          <div className="h-px w-16 bg-[#7a1b3a]/20" />
        </motion.div>

        {/* Mempelai Wanita */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#7a1b3a]/10">
            <span className="font-serif text-5xl text-[#7a1b3a]">
              {bride.name[0]}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-4xl text-[#7a1b3a]">
            {bride.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {bride.parent}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
