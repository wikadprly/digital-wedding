"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset } from "@/lib/motion";
import { useTranslation } from "@/lib/i18n";
import Reveal from "@/components/ui/reveal";

function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />;
}

export default function Closing() {
  const config = useConfig();
  const fadeUp = useMotionPreset("fadeUp");
  const fade = useMotionPreset("fade");
  const { t } = useTranslation();

  if (!config) return null;

  return (
    <section className="relative mx-auto flex min-h-svh w-full max-w-[430px] flex-col items-center overflow-hidden bg-ivory px-6 pb-[12vh] pt-[34vh] text-center">
      {/* header terima kasih */}
      <motion.div
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
      >
        <Image
          src="/wayang/p8header.png"
          alt=""
          width={1080}
          height={1920}
          priority
          className="h-[38vh] w-full object-cover object-top"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.55) 74%, rgba(0,0,0,0.22) 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.55) 74%, rgba(0,0,0,0.22) 86%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* footer terima kasih */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
      >
        <Image
          src="/wayang/p8footer.png"
          alt=""
          width={1080}
          height={515}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      <Botanical className="pointer-events-none absolute -left-10 top-16 h-44 w-44 -scale-x-100 opacity-[0.1]" />
      <Reveal
        variants={fadeUp}
        amount={0.55}
        className="relative z-10"
      >
        <motion.div variants={fade} className="flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-champagne" />
          <Diamond />
          <span className="h-px w-14 bg-champagne" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-4xl uppercase tracking-[0.25em] text-burgundy"
        >
          {t("closing.title")}
        </motion.h2>

        <motion.p
          variants={fade}
          className="mx-auto mt-6 max-w-sm font-serif-alt text-[15px] italic leading-relaxed text-brown-mute"
        >
          {t("closing.message")}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 font-script text-[44px] leading-tight text-burgundy"
        >
          {t("closing.sincerely")},
          <br />
          {config.groomName} &amp; {config.brideName}
        </motion.p>

        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onClick={() =>
            document
              .getElementById("wishes")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="mx-auto mt-10 flex items-center gap-2 rounded-full bg-burgundy px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(74,52,56,0.5)] transition hover:bg-burgundy/90"
        >
          {t("closing.confirmAttendance")}
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </Reveal>

      <Reveal
        variants={fade}
        amount={0.9}
        className="relative z-10 mt-8 flex flex-col items-center gap-4"
      >
        <div className="flex gap-5 text-burgundy/80">
          <a
            href="#"
            aria-label="Instagram"
            className="transition hover:text-burgundy"
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
            className="transition hover:text-burgundy"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
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