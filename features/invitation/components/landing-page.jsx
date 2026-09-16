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
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-ivory font-sans">
      {/* video background — freezes on last frame when finished */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/cover.mp4"
        poster="/images/coverr.JPG"
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-8 pt-10 text-center">
        {/* eyebrow */}
        <motion.p
          {...stage(0)}
          className="text-[11px] font-medium uppercase tracking-[0.35em] text-dusty drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)]"
        >
          The Wedding Of
        </motion.p>

        <motion.div {...stage(1)} className="mt-3 flex items-center justify-center">
          <Diamond />
        </motion.div>

        {/* photo frame — vertical oval / arched */}
        <motion.div
          {...stage(2)}
          className="relative mt-5 w-[clamp(160px,48vw,215px)] aspect-[3/4] rounded-[130px_130px_26px_26px] border border-dusty/40 bg-rosy/40 p-2 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.4)] backdrop-blur-[2px]"
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

        {/* names */}
        <motion.h1
          {...stage(3)}
          className="mt-6 font-serif text-[clamp(32px,10vw,40px)] font-semibold leading-[1.05] text-dusty drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]"
        >
          {groomName}
        </motion.h1>
        <motion.span
          {...stage(4)}
          className="my-1 font-script text-4xl leading-none text-mute drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
        >
          &amp;
        </motion.span>
        <motion.h1
          {...stage(4)}
          className="font-serif text-[clamp(32px,10vw,40px)] font-semibold leading-[1.05] text-dusty drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]"
        >
          {brideName}
        </motion.h1>

        {/* guest */}
        <motion.div {...stage(5)} className="mt-5 space-y-1">
          <p className="text-sm text-brown-mute drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)]">Dear,</p>
          <p className="font-serif-alt text-lg italic text-dusty drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)]">
            {guestName || t("hero.guestFallback")}
          </p>
        </motion.div>

        {/* invitation copy */}
        <motion.p
          {...stage(6)}
          className="mt-4 max-w-[300px] text-[16px] leading-[1.8] text-brown drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)]"
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
          className="mt-6 flex items-center gap-2 rounded-full bg-dusty px-7 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
        >
          {t("landing.openInvitation")}
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* divider */}
        <motion.div {...stage(8)} className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-champagne/80" />
          <Diamond small />
          <span className="h-px w-8 bg-champagne/80" />
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