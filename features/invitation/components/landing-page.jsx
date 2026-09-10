"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "@/lib/i18n";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { resolveGuestName } from "@/lib/invitation-storage";

export default function LandingPage({ onOpenInvitation }) {
  const shouldReduceMotion = useReducedMotion();
  const config = useConfig();
  const { t } = useTranslation();

  const guestName = useSyncExternalStore(
    () => () => {},
    () => resolveGuestName(),
    () => "",
  );

  const stage = (i) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: 0.15 * i,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  const groomName = config.groomName;
  const brideName = config.brideName;

  return (
    <div className="relative mx-auto flex min-h-svh w-full max-w-[430px] flex-col overflow-hidden bg-ivory font-sans">
      {/* botanical line art corner */}
      <Botanical className="absolute -left-8 -top-6 h-40 w-40 opacity-10" />
      <Botanical className="absolute -bottom-8 -right-8 h-40 w-40 rotate-180 opacity-10" />

      <div className="relative z-10 flex flex-1 flex-col items-center px-8 pb-14 pt-14 text-center">
        {/* eyebrow */}
        <motion.p
          {...stage(0)}
          className="text-[11px] font-medium uppercase tracking-[0.35em] text-dusty"
        >
          The Wedding Of
        </motion.p>

        <motion.div {...stage(1)} className="mt-4 flex items-center justify-center">
          <Diamond />
        </motion.div>

        {/* photo frame — vertical oval / arched */}
        <motion.div
          {...stage(2)}
          className="relative mt-8 h-[285px] w-[215px] overflow-hidden border border-dusty/25 bg-rosy shadow-[0_16px_36px_-18px_rgba(154,83,104,0.4)]"
          style={{ borderRadius: "120px 120px 24px 24px" }}
        >
          <Image
            src="/couple.png"
            alt={`${groomName} & ${brideName}`}
            fill
            sizes="215px"
            priority
            className="object-cover"
          />
        </motion.div>

        {/* names — Cormorant / Playfair */}
        <motion.h1
          {...stage(3)}
          className="mt-9 font-serif text-[40px] font-semibold leading-[1.05] text-dusty"
        >
          {groomName}
        </motion.h1>
        <motion.span
          {...stage(4)}
          className="my-1 font-script text-4xl leading-none text-mute"
        >
          &amp;
        </motion.span>
        <motion.h1
          {...stage(4)}
          className="font-serif text-[40px] font-semibold leading-[1.05] text-dusty"
        >
          {brideName}
        </motion.h1>

        {/* guest */}
        <motion.div {...stage(5)} className="mt-8 space-y-1">
          <p className="text-sm text-brown-mute">Dear,</p>
          <p className="font-serif-alt text-lg italic text-dusty">
            {guestName || t("hero.guestFallback")}
          </p>
        </motion.div>

        {/* invitation copy */}
        <motion.p
          {...stage(6)}
          className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-brown"
        >
          Dengan penuh sukacita, kami mengundang Anda untuk hadir di hari
          istimewa kami.
        </motion.p>

        {/* CTA */}
        <motion.button
          {...stage(7)}
          whileTap={{ scale: 0.96 }}
          onClick={onOpenInvitation}
          className="mt-8 flex items-center gap-2 rounded-full bg-dusty px-7 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(154,83,104,0.6)] transition-transform hover:-translate-y-0.5"
        >
          {t("landing.openInvitation")}
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* divider */}
        <motion.div {...stage(8)} className="mt-10 flex items-center gap-3">
          <span className="h-px w-8 bg-champagne" />
          <Diamond small />
          <span className="h-px w-8 bg-champagne" />
        </motion.div>
      </div>
    </div>
  );
}

function Diamond({ small }) {
  return (
    <span
      className={
        small ? "inline-block h-1.5 w-1.5 rotate-45 bg-champagne" : "inline-block h-2 w-2 rotate-45 bg-champagne"
      }
    />
  );
}

function Botanical({ className }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      className={className}
      style={{ color: "#9A5368" }}
      aria-hidden
    >
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
      <circle cx="60" cy="52" r="2" fill="currentColor" />
      <circle cx="30" cy="58" r="1.6" fill="currentColor" />
    </svg>
  );
}