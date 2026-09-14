"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate, toJakartaEpoch } from "@/lib/format-event-date";
import { useTranslation } from "@/lib/i18n";
import { useMotionPreset, staggerContainer } from "@/lib/motion";

function CountBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden rounded-lg px-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "-110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="block font-serif text-4xl text-ivory"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ivory/80">
        {label}
      </span>
    </div>
  );
}

function CountdownTimer({ targetDate }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculate = () => {
      const difference = +new Date(targetDate) - Date.now();
      if (difference <= 0) return {};
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { value: timeLeft.days ?? 0, label: t("hero.days") },
    { value: timeLeft.hours ?? 0, label: t("hero.hours") },
    { value: timeLeft.minutes ?? 0, label: t("hero.minutes") },
    { value: timeLeft.seconds ?? 0, label: t("hero.seconds") },
  ];

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[300px] items-start justify-between">
      {items.map((item) => (
        <CountBox key={item.label} value={item.value} label={item.label} />
      ))}
    </div>
  );
}

function Diamond({ className }) {
  return (
    <span className={`inline-block h-1.5 w-1.5 rotate-45 bg-champagne ${className}`} />
  );
}

export default function Hero() {
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const { t } = useTranslation();

  if (!config) return null;

  const firstAgenda = config.agenda?.[0];
  const countdownTarget = toJakartaEpoch(
    config.date,
    firstAgenda?.startTime || "00:00",
  );
  const dateFull = formatEventDate(config.date, "full").toUpperCase();
  const dateShort = formatEventDate(config.date, "short").toUpperCase();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-mute px-6 pb-16 pt-14 text-center"
    >
      <Botanical className="pointer-events-none absolute -right-10 top-10 h-36 w-36 rotate-45 opacity-15" />

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="font-serif text-sm uppercase tracking-[0.3em] text-ivory/90"
        >
          {t("hero.save")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-script text-[56px] leading-none text-ivory"
        >
          {t("hero.theDate")}
        </motion.h2>

        <motion.div variants={fade} className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-champagne" />
          <Diamond />
          <span className="h-px w-10 bg-champagne" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative mx-auto mt-7 h-56 max-w-[300px] overflow-hidden rounded-[20px] border border-ivory/40 bg-rosy shadow-[0_18px_40px_-20px_rgba(74,52,56,0.5)]"
        >
          <Image
            src="/images/save%20the%20date.JPG"
            alt={`${config.groomName} & ${config.brideName}`}
            fill
            sizes="300px"
            className="object-cover"
          />
        </motion.div>

        <motion.p
          variants={fade}
          className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-ivory/90"
        >
          {t("hero.akadResepsi")}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-ivory"
        >
          {dateFull}
        </motion.p>

        <CountdownTimer targetDate={countdownTarget} />

        <motion.div
          variants={fadeUp}
          className="mt-9 border-t border-ivory/20 pt-6"
        >
          <p className="font-serif text-4xl leading-tight text-ivory">
            {dateShort}
          </p>
          <p className="mt-3 text-sm text-ivory/90">{config.time}</p>
          <p className="mt-1 text-sm text-ivory/90">{config.location}</p>
        </motion.div>

        <motion.a
          variants={fadeUp}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          href="#events"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-rosy px-7 py-3 text-sm font-medium text-dusty shadow-[0_10px_24px_-12px_rgba(74,52,56,0.6)]"
        >
          <MapPin className="h-4 w-4" />
          {t("hero.viewLocation")}
        </motion.a>
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
    </svg>
  );
}