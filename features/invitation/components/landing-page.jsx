"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "@/lib/i18n";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { resolveGuestName } from "@/lib/invitation-storage";

const PRIMARY = "#9A5368"; // Dusty Rose — buttons, names, eyebrow
const SECONDARY = "#B97889"; // Muted Pink — accents, "&"
const ACCENT = "#C8A77B"; // Champagne — ornaments, diamond divider
const BASE = "#F7F2EC"; // Warm Ivory — page background
const CARD_BG = "#FAF6F4"; // Rose Ivory — photo frame
const TEXT_PRIMARY = "#4A3438"; // Dark Brown — body text
const TEXT_SECONDARY = "#8F6B72"; // label "Dear,"
const BORDER = "#E7D7DC"; // Rose Gray — dividers

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
    <div
      className="relative mx-auto flex min-h-svh w-full max-w-[430px] flex-col overflow-hidden font-sans"
      style={{ backgroundColor: BASE }}
    >
      {/* corner ornaments */}
      <FloralCorner className="absolute -left-6 -top-4 h-32 w-32 rotate-0 opacity-70" />
      <FloralCorner className="absolute -bottom-6 -right-6 h-36 w-36 rotate-180 opacity-70" />

      <div className="relative z-10 flex flex-1 flex-col items-center px-8 pb-28 pt-14 text-center">
        {/* eyebrow */}
        <motion.p
          {...stage(0)}
          className="text-[11px] font-medium tracking-[0.35em]"
          style={{ color: PRIMARY }}
        >
          THE WEDDING OF
        </motion.p>

        <motion.div {...stage(1)} className="mt-3 flex items-center justify-center">
          <Diamond />
        </motion.div>

        {/* photo frame — arched top */}
        <motion.div
          {...stage(2)}
          className="relative mt-8 h-[300px] w-[220px] overflow-hidden shadow-[0_18px_40px_-16px_rgba(154,83,104,0.35)]"
          style={{ borderRadius: "120px 120px 24px 24px", backgroundColor: CARD_BG }}
        >
          <Image
            src="/couple.png"
            alt={`${groomName} & ${brideName}`}
            fill
            sizes="220px"
            priority
            className="object-cover"
          />
        </motion.div>

        {/* names — Playfair Display */}
        <motion.h1
          {...stage(3)}
          className="mt-9 font-serif text-[40px] leading-[1.05]"
          style={{ color: PRIMARY }}
        >
          {groomName}
        </motion.h1>
        <motion.span
          {...stage(4)}
          className="my-1 font-serif-alt text-2xl italic"
          style={{ color: SECONDARY }}
        >
          &amp;
        </motion.span>
        <motion.h1
          {...stage(4)}
          className="font-serif text-[40px] leading-[1.05]"
          style={{ color: PRIMARY }}
        >
          {brideName}
        </motion.h1>

        {/* greeting */}
        <motion.div {...stage(5)} className="mt-8 space-y-1">
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Dear,
          </p>
          <p className="font-serif-alt text-lg italic" style={{ color: PRIMARY }}>
            {guestName || t("hero.guestFallback")}
          </p>
        </motion.div>

        {/* invitation copy — DM Sans */}
        <motion.p
          {...stage(6)}
          className="mt-4 max-w-[280px] text-sm leading-relaxed"
          style={{ color: TEXT_PRIMARY }}
        >
          Dengan penuh sukacita, kami mengundang Anda untuk hadir di hari
          istimewa kami.
        </motion.p>

        {/* CTA */}
        <motion.button
          {...stage(7)}
          whileTap={{ scale: 0.96 }}
          onClick={onOpenInvitation}
          className="mt-8 flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-8px_rgba(154,83,104,0.55)] transition-transform"
          style={{ backgroundColor: PRIMARY }}
        >
          {t("landing.openInvitation")}
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        <motion.div {...stage(8)} className="mt-10 flex items-center gap-3">
          <span className="h-px w-8" style={{ backgroundColor: BORDER }} />
          <Diamond small />
          <span className="h-px w-8" style={{ backgroundColor: BORDER }} />
        </motion.div>
      </div>
    </div>
  );
}

function Diamond({ small }) {
  return (
    <span
      className={
        small ? "inline-block h-1.5 w-1.5 rotate-45" : "inline-block h-2 w-2 rotate-45"
      }
      style={{ backgroundColor: ACCENT }}
    />
  );
}

function FloralCorner({ className }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      className={className}
      style={{ color: ACCENT }}
      aria-hidden
    >
      <path
        d="M8 8c14 2 30 10 38 24 6 11 6 24-2 32-7 7-19 6-24-2-4-7-2-16 6-19"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M8 8c2 18 10 36 26 46 12 8 27 9 36 1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="46" cy="34" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="60" cy="52" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="30" cy="58" r="1.6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}