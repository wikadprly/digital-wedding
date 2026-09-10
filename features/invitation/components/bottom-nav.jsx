"use client";

import { useEffect, useState } from "react";
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

const SECTION_ORDER = ["home", "profile", "events", "gallery", "wishes"];

const BUTTON_WIDTH = 44;
const GAP = 6;
const PITCH = BUTTON_WIDTH + GAP;

export default function BottomNav() {
  const { t } = useTranslation();
  const [active, setActive] = useState("home");
  const activeIndex = Math.max(0, NAV_ITEMS.findIndex((item) => item.id === active));

  useEffect(() => {
    const probe = () => {
      const half = window.innerHeight / 2;
      let current = SECTION_ORDER[0];

      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= half) {
          current = id;
        } else {
          break;
        }
      }

      setActive(current);
    };

    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);

    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex justify-center rounded-full border border-rose-line bg-rosy/90 px-3.5 py-2 shadow-[0_18px_40px_-16px_rgba(74,52,56,0.4)] backdrop-blur-md">
        <div className="relative flex items-center gap-[6px]">
          <motion.span
            initial={false}
            animate={{ x: activeIndex * PITCH }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute left-0 top-0 h-11 w-11 rounded-full bg-dusty shadow-[0_6px_14px_-6px_rgba(154,83,104,0.7)]"
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
                  className={`h-5 w-5 ${isActive ? "text-white" : "text-dusty/70"}`}
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