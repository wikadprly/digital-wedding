"use client";

import { motion } from "motion/react";
import { MessageCircle, Heart, ArrowRight } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset } from "@/lib/motion";

function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />;
}

export default function Closing() {
  const config = useConfig();
  const fadeUp = useMotionPreset("fadeUp");
  const fade = useMotionPreset("fade");

  if (!config) return null;

  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-dusty px-6 py-16 text-center text-ivory">
      <Botanical className="pointer-events-none absolute -left-10 top-16 h-44 w-44 -scale-x-100 opacity-[0.1]" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.div variants={fade} className="flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-champagne" />
          <Diamond />
          <span className="h-px w-14 bg-champagne" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-4xl uppercase tracking-[0.25em]"
        >
          Terima Kasih
        </motion.h2>

        <motion.p
          variants={fade}
          className="mx-auto mt-6 max-w-sm font-serif-alt text-[15px] italic leading-relaxed text-ivory/85"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak /
          Ibu / Saudara/i berkenan hadir dan memberikan doa restu.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 font-script text-[44px] leading-tight text-ivory"
        >
          Sincerely,
          <br />
          {config.groomName} &amp; {config.brideName}
        </motion.p>

        <motion.button
          variants={fadeUp}
          onClick={() =>
            document
              .getElementById("wishes")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="mx-auto mt-10 flex items-center gap-2 rounded-full bg-ivory px-8 py-3 text-sm font-semibold text-dusty shadow-[0_10px_24px_-12px_rgba(74,52,56,0.5)] transition hover:bg-rosy"
        >
          Konfirmasi Kehadiran
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-14 flex flex-col items-center gap-4"
      >
        <p className="flex items-center gap-1.5 text-xs text-ivory/75">
          Made with <Heart className="h-3.5 w-3.5 fill-champagne text-champagne" /> by{" "}
          <span className="font-semibold text-ivory">Wika Dwi Aprilia</span>
        </p>
        <div className="flex gap-5 text-ivory/85">
          <a
            href="#"
            aria-label="Instagram"
            className="transition hover:text-ivory"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="transition hover:text-ivory"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
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