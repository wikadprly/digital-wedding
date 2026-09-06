"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset, stagger } from "@/lib/motion";

const NAV_ITEMS = [
  { id: "home", icon: "home", labelKey: "nav.home" },
  { id: "events", icon: "calendar", labelKey: "nav.event" },
  { id: "gifts", icon: "gift", labelKey: "nav.gifts" },
  { id: "wishes", icon: "heart", labelKey: "nav.wishes" },
];

function Icon({ name, className }) {
  switch (name) {
    case "home":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "gift":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10h-4M12 22V12m0 0L9.5 9.5M12 12l2.5-2.5M4 12v10h4M20 12H4M16 12V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v7" />
        </svg>
      );
    case "heart":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BottomBar() {
  const { t } = useTranslation();
  const config = useConfig();
  const [active, setActive] = useState("home");
  const fadeUp = useMotionPreset("fadeUp");
  const activeRef = useRef("home");

  const setActiveSafe = (id) => {
    if (activeRef.current !== id) {
      activeRef.current = id;
      setActive(id);
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveSafe(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const trackables = NAV_ITEMS.filter((n) => n.id !== "home").map((n) =>
      document.getElementById(n.id),
    );

    const handleScroll = () => {
      const midpoint = window.innerHeight / 3;
      const current = window.scrollY + midpoint;

      let currentId = "home";
      for (const el of trackables) {
        if (el && current >= el.offsetTop) {
          currentId = el.id;
        }
      }
      setActiveSafe(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!config) return null;

  return (
    <nav className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-[#7a1b3a]/10 bg-white/90 px-2 py-2 shadow-xl backdrop-blur-md">
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === item.id;
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={stagger(i, 0.06)}
              aria-label={t(item.labelKey)}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                isActive ? "bg-[#7a1b3a] text-white" : "text-[#7a1b3a]/60 hover:text-[#7a1b3a]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-bar-active"
                  className="absolute inset-0 rounded-full bg-[#7a1b3a]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                name={item.icon}
                className={cn("relative z-10 h-5 w-5", isActive && "text-white")}
              />
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
