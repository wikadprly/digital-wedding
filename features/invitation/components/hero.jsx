"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate, toJakartaEpoch } from "@/lib/format-event-date";
import { useTranslation } from "@/lib/i18n";
import { useMotionPreset, staggerContainer } from "@/lib/motion";

function CountBox({ value, label }) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div className="flex h-14 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "-110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="block font-serif text-[48px] leading-none text-burgundy"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-burgundy/80">
        {label}
      </span>
    </div>
  );
}

function getTimeLeft(targetDate) {
  const difference = +new Date(targetDate) - Date.now();
  if (difference <= 0) return {};
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownTimer({ targetDate }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { value: timeLeft.days ?? 0, label: t("hero.days") },
    { value: timeLeft.hours ?? 0, label: t("hero.hours") },
    { value: timeLeft.minutes ?? 0, label: t("hero.minutes") },
    { value: timeLeft.seconds ?? 0, label: t("hero.seconds") },
  ];

  return (
    <div className="mx-auto mt-8 grid w-full max-w-[300px] grid-cols-4">
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

  return (
    <section
      id="home"
      className="relative mx-auto flex w-full max-w-[430px] flex-col items-center overflow-hidden bg-ivory px-6 pb-[20vh] pt-[15vh] text-center"
    >
      <Botanical className="pointer-events-none absolute -right-10 top-10 h-36 w-36 rotate-45 opacity-15" />

      {/* dekorasi atas p1header — animasi pembuka: meluncur diagonal sekali, lalu diam */}
      <motion.div
        initial={{ y: "-120%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center"
      >
        <Image
          src="/wayang/p1header.png"
          alt=""
          width={1080}
          height={569}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* dekorasi bawah coverfooter — muncul pelan dari bawah sekali lalu berhenti */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
      >
        <Image
          src="/wayang/coverhfooter.png"
          alt=""
          width={1080}
          height={1080}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 w-full"
      >
        <motion.p
          variants={fadeUp}
          className="font-serif text-sm uppercase tracking-[0.22em] text-burgundy"
        >
          {t("hero.save")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-2 font-serif text-2xl uppercase tracking-[0.22em] text-burgundy"
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
          className="relative mx-auto mt-7 h-64 max-w-[340px] overflow-hidden rounded-[20px] border border-rose-line bg-rosy shadow-[0_18px_40px_-20px_rgba(74,52,56,0.5)]"
        >
          <Image
            src="/images/coverr.JPG"
            alt={`${config.groomName} & ${config.brideName}`}
            fill
            sizes="340px"
            className="object-cover object-[50%_33%]"
          />
        </motion.div>

        <motion.p
          variants={fade}
          className="mt-10 text-[11px] font-medium uppercase tracking-[0.3em] text-dusty/80"
        >
          {t("hero.akadResepsi")}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-dusty"
        >
          {dateFull}
        </motion.p>

        <CountdownTimer targetDate={countdownTarget} />
      </motion.div>
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
    </svg>
  );
}