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
    <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-x-hidden bg-ivory font-sans">
      {/* botanical line art corner */}
      <Botanical className="absolute -left-8 -top-6 h-40 w-40 opacity-10" />
      <Botanical className="absolute -bottom-8 -right-8 h-40 w-40 rotate-180 opacity-10" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-8 pt-10 text-center">
        {/* eyebrow */}
        <motion.p
          {...stage(0)}
          className="text-[11px] font-medium uppercase tracking-[0.35em] text-dusty"
        >
          The Wedding Of
        </motion.p>

        <motion.div {...stage(1)} className="mt-3 flex items-center justify-center">
          <Diamond />
        </motion.div>

        {/* photo frame — vertical oval / arched */}
        <motion.div
          {...stage(2)}
          className="relative mt-5 w-[clamp(160px,48vw,215px)] aspect-[3/4] rounded-[130px_130px_26px_26px] border border-dusty/40 bg-rosy/40 p-2 shadow-[0_16px_36px_-18px_rgba(154,83,104,0.4)]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[116px_116px_16px_16px] bg-rosy">
              <Image
                src="/images/coverr.JPG"
                alt={`${groomName} & ${brideName}`}
                fill
                sizes="215px"
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* names — Cormorant / Playfair */}
        <motion.h1
          {...stage(3)}
          className="mt-6 font-serif text-[clamp(32px,10vw,40px)] font-semibold leading-[1.05] text-dusty"
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
          className="font-serif text-[clamp(32px,10vw,40px)] font-semibold leading-[1.05] text-dusty"
        >
          {brideName}
        </motion.h1>

        {/* guest */}
        <motion.div {...stage(5)} className="mt-5 space-y-1">
          <p className="text-sm text-brown-mute">Dear,</p>
          <p className="font-serif-alt text-lg italic text-dusty">
            {guestName || t("hero.guestFallback")}
          </p>
        </motion.div>

        {/* invitation copy — 3 baris seperti bait */}
        <motion.p
          {...stage(6)}
          className="mt-4 max-w-[300px] text-[16px] leading-[1.8] text-brown"
        >
          Dengan penuh sukacita,
          <br />
          kami mengundang Anda untuk hadir
          <br />
          di hari istimewa kami.
        </motion.p>

        {/* CTA */}
        <motion.button
          {...stage(7)}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          onClick={onOpenInvitation}
          className="mt-6 flex items-center gap-2 rounded-full bg-dusty px-7 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(154,83,104,0.6)] transition-transform hover:-translate-y-0.5"
        >
          {t("landing.openInvitation")}
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* divider */}
        <motion.div {...stage(8)} className="mt-8 flex items-center gap-3">
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