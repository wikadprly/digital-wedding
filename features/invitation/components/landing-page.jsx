"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "motion/react";
import { useState } from "react";
import { getGuestName } from "@/lib/invitation-storage";
import {
  useMotionPreset,
  staggerContainer,
  LOOP,
  useReducedMotionFlag,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function LandingPage({ onOpenInvitation }) {
  const config = useConfig();
  const reduceMotion = useReducedMotionFlag();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");
  const { t } = useTranslation();

  const [guestName] = useState(() => {
    if (typeof window === "undefined") return "";
    return getGuestName() || "";
  });

  const groomInitial = (config.groomName || "R")[0];
  const brideInitial = (config.brideName || "R")[0];

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      className={cn("min-h-screen relative overflow-hidden")}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-[#7a1b3a] via-[#8a2044] to-[#5c1029]",
        )}
      />

      <div
        className={cn(
          "absolute inset-0 opacity-40 mix-blend-overlay",
          "bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.35),_transparent_60%)]",
        )}
      />

      <div className={cn("relative z-10 min-h-screen flex flex-col")}>
        <div
          className={cn(
            "flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-32",
          )}
        >
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="visible"
            className={cn("w-full max-w-md text-center")}
          >
            <motion.div variants={fade} className={cn("space-y-2 mb-10")}>
              <p className="text-rose-100/80 text-xs tracking-[0.35em] uppercase">
                The Wedding Of
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-rose-200/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-rose-200/60" />
                <div className="h-px w-12 bg-rose-200/40" />
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className={cn(
                "relative mx-auto h-[300px] w-[200px] overflow-hidden rounded-full",
                "border-4 border-amber-100/30 shadow-2xl",
              )}
            >
              <Image
                src="/couple.png"
                alt={`${config.groomName} & ${config.brideName}`}
                fill
                sizes="200px"
                className="object-cover"
                priority
              />

              <div
                className={cn(
                  "absolute top-8 left-1/2 -translate-x-1/2 text-center z-10",
                )}
              >
                <h1 className="font-serif text-7xl text-white drop-shadow-md">
                  {groomInitial}
                  <span className="text-amber-200"> {brideInitial}</span>
                </h1>
              </div>

              <div
                className={cn(
                  "absolute inset-x-0 bottom-6 text-center z-10 text-white",
                )}
              >
                <p className="font-serif text-2xl drop-shadow">
                  {config.groomName}
                </p>
                <p className="text-xs text-rose-100/80 my-1">&amp;</p>
                <p className="font-serif text-2xl drop-shadow">
                  {config.brideName}
                </p>
              </div>

              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-[#5c1029]/70 via-transparent to-[#5c1029]/40",
                )}
              />
            </motion.div>

            <motion.div variants={fadeUp} className={cn("mt-10 space-y-3")}>
              <p className="text-rose-100/80 font-serif italic">Dear,</p>
              <h2
                className="font-serif text-3xl text-amber-100"
                suppressHydrationWarning
              >
                {guestName || t("hero.guestFallback")}
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className={cn("mt-10")}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInvitation}
                className={cn(
                  "inline-flex items-center justify-center rounded-full",
                  "bg-[#b1899a] px-12 py-4 text-white shadow-lg",
                  "hover:bg-[#9b7285] transition-colors duration-200",
                )}
              >
                <span className={cn("mr-2")}>
                  {t("landing.openInvitation")}
                </span>
                <motion.span
                  animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { repeat: Infinity, duration: LOOP.nudge }
                  }
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#3d0719] to-transparent",
          )}
        >
          <div
            className={cn(
              "absolute bottom-4 left-4 h-24 w-20 opacity-70 bg-contain bg-no-repeat bg-center",
              "bg-[url('/branch-left.svg')]",
            )}
          />
          <div
            className={cn(
              "absolute bottom-4 right-4 h-24 w-20 opacity-70 -scale-x-100 bg-contain bg-no-repeat bg-center",
              "bg-[url('/branch-left.svg')]",
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#e8c98a] via-[#fff3d6] to-[#e8c98a] opacity-80",
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
