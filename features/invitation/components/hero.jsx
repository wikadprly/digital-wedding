"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate } from "@/lib/format-event-date";
import { resolveGuestName } from "@/lib/invitation-storage";
import { useTranslation } from "@/lib/i18n";
import {
  useMotionPreset,
  staggerContainer,
} from "@/lib/motion";

function CountdownTimer({ targetDate }) {
  const { t } = useTranslation();

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return {};

    return {
      [t("hero.days")]: Math.floor(difference / (1000 * 60 * 60 * 24)),
      [t("hero.hours")]: Math.floor((difference / (1000 * 60 * 60)) % 24),
      [t("hero.minutes")]: Math.floor((difference / 1000 / 60) % 60),
      [t("hero.seconds")]: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate, t]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="mx-auto mt-8 flex w-4/5 max-w-md justify-between text-[#5c1029]">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <span className="text-2xl font-bold text-[#7a1b3a]">
            {timeLeft[interval]}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#5c1029]/70">
            {interval}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");

  const guestName = useSyncExternalStore(
    () => () => {},
    () => resolveGuestName(),
    () => "",
  );

  const groomInitial = (config.groomName || "R")[0];
  const brideInitial = (config.brideName || "R")[0];

  return (
    <section
      id="home"
      className="relative overflow-hidden text-center"
    >
      <div className="bg-gradient-to-b from-[#7a1b3a] via-[#8a2044] to-[#5c1029] pb-16 pt-20 sm:pt-28 px-4">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.p
            variants={fade}
            className="text-[11px] tracking-[0.4em] uppercase text-amber-100/80"
          >
            The Wedding Of
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif text-4xl text-[#e8c98a] drop-shadow-md sm:text-5xl"
          >
            {config.groomName}
          </motion.h1>

          <motion.span
            variants={fade}
            className="block font-serif text-3xl text-[#e8c98a] my-2"
          >
            <span className="mr-2 text-amber-200">{groomInitial}</span>&
            <span className="ml-2 text-amber-200">{brideInitial}</span>
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl text-[#e8c98a] drop-shadow-md sm:text-5xl"
          >
            {config.brideName}
          </motion.h1>

          <motion.div variants={fade} className="mt-8">
            <span className="rounded-full border border-amber-100/30 px-5 py-2 text-xs tracking-[0.2em] uppercase text-amber-100/90">
              {guestName || t("hero.guestFallback")}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-white px-4 pb-16 pt-8">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-md"
        >
          <CountdownTimer targetDate={config.date} />

          <motion.div
            variants={scaleIn}
            className="mx-auto mt-6 flex w-4/5 max-w-md items-center justify-center gap-3"
          >
            <div className="h-px flex-1 bg-[#b1899a]" />
            <p className="text-sm font-semibold text-[#7a1b3a]">
              {formatEventDate(config.date, "short")}
            </p>
            <div className="h-px flex-1 bg-[#b1899a]" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 text-sm text-[#5c1029]/80"
          >
            {config.time} · {config.location}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
