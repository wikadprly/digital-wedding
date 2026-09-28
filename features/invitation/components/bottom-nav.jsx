"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Home, CalendarHeart, Users, Images, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "home", icon: Home, labelKey: "nav.home" },
  { id: "profile", icon: Users, labelKey: "nav.couple" },
  { id: "events", icon: CalendarHeart, labelKey: "nav.saveDate" },
  { id: "gallery", icon: Images, labelKey: "nav.gallery" },
  { id: "wishes", icon: Heart, labelKey: "nav.rsvp" },
];

const SECTION_ORDER = NAV_ITEMS.map((item) => item.id);

const BUTTON_WIDTH = 44;
const GAP = 6;
const PITCH = BUTTON_WIDTH + GAP;

const TRIGGER_LINE = 0.2;
const SCROLL_LOCK_MS = 1000;

function pickActiveSection() {
  const viewport = window.innerHeight;
  const line = viewport * TRIGGER_LINE;
  let current = null;

  for (const id of SECTION_ORDER) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) current = id;
    else break;
  }

  return current;
}

export default function BottomNav() {
  const { t } = useTranslation();
  const [active, setActive] = useState("home");
  const activeRef = useRef("home");
  const lockRef = useRef(false);
  const unlockRef = useRef(null);
  const activeIndex = Math.max(0, NAV_ITEMS.findIndex((item) => item.id === active));

  useEffect(() => {
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      if (lockRef.current) return;

      const next = pickActiveSection();
      if (!next || next === activeRef.current) return;

      activeRef.current = next;
      setActive(next);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => () => clearTimeout(unlockRef.current), []);

  const scrollTo = (id) => {
    activeRef.current = id;
    setActive(id);
    lockRef.current = true;
    clearTimeout(unlockRef.current);
    unlockRef.current = setTimeout(() => {
      lockRef.current = false;
    }, SCROLL_LOCK_MS);

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex justify-center rounded-full border border-rose-line bg-rosy/90 px-3.5 py-2 shadow-[0_18px_40px_-16px_rgba(74,52,56,0.4)] backdrop-blur-md">
        <div className="relative flex items-center gap-[6px]">
          <motion.span
            initial={false}
            animate={{ x: activeIndex * PITCH }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute left-0 top-0 h-11 w-11 rounded-full bg-burgundy shadow-[0_6px_14px_-6px_rgba(86,17,18,0.7)]"
          />
          {NAV_ITEMS.map(({ id, icon: Icon, labelKey }) => {
            const isActive = active === id;
            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                aria-label={t(labelKey)}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full"
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-white" : "text-burgundy/70"}`}
                  strokeWidth={isActive ? 2 : 1.75}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}