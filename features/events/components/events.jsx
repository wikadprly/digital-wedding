"use client";

import { motion } from "motion/react";
import { CalendarHeart, MapPin } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate } from "@/lib/format-event-date";
import { useMotionPreset, staggerContainer } from "@/lib/motion";
import { useTranslation } from "@/lib/i18n";

function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />;
}

function EventRow({ item, date }) {
  const time = `${item.startTime} - ${item.endTime}`
    .replace(/\s*WIB/gi, "")
    .trim();
  return (
    <motion.div
      whileHover={{ x: 6 }}
      className="flex items-center gap-4 rounded-lg py-4 transition-colors hover:bg-rosy/60"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rose-line bg-rosy text-dusty">
        <CalendarHeart className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <h3 className="font-serif text-lg leading-tight text-dusty">
          {item.title}
        </h3>
        <p className="mt-0.5 text-xs uppercase tracking-wider text-brown-mute">
          {formatEventDate(date, "full")}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-brown">{time} WIB</p>
        {item.location && (
          <p className="mt-0.5 flex items-start gap-1 text-xs leading-relaxed text-brown-mute">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dusty" />
            <span>
              {item.location}
              {item.address && item.address !== item.location ? (
                <span className="block">
                  <span className="font-medium">Alamat: </span>
                  {item.address}
                </span>
              ) : null}
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Events() {
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const { t } = useTranslation();

  if (!config) return null;

  const agenda =
    Array.isArray(config.agenda) && config.agenda.length > 0
      ? config.agenda
      : [
          {
            title: "Akad Nikah",
            date: config.date,
            startTime: (config.time || "10:00 - 13:00").split(" - ")[0],
            endTime: (config.time || "10:00 - 13:00").split(" - ")[1],
          },
          {
            title: "Resepsi Nikah",
            date: config.date,
            startTime: (config.time || "10:00 - 13:00").split(" - ")[0],
            endTime: (config.time || "10:00 - 13:00").split(" - ")[1],
          },
        ];

  return (
    <section
      id="events"
      className="relative mx-auto w-full max-w-[430px] overflow-hidden px-6"
    >
      <Botanical className="pointer-events-none absolute -right-10 top-16 h-40 w-40 rotate-45 opacity-[0.08]" />

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10"
      >
        <div className="text-center">
          <motion.p
            variants={fade}
            className="text-[11px] font-medium uppercase tracking-[0.3em] text-brown-mute"
          >
            {t("events.detailAcara")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 font-serif text-2xl uppercase tracking-[0.2em] text-dusty"
          >
            {t("events.akadResepsi")}
          </motion.h2>
          <motion.div
            variants={fade}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-champagne" />
            <Diamond />
            <span className="h-px w-8 bg-champagne" />
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-8 max-w-md overflow-hidden rounded-[24px] border border-rose-line bg-rosy shadow-[0_20px_40px_-20px_rgba(74,52,56,0.45)]"
        >
          <div className="px-6 pt-4">
            {agenda.map((item, i) => (
              <div key={i}>
                <EventRow item={item} date={item.date || config.date} />
                {i < agenda.length - 1 && (
                  <div className="flex items-center gap-3 px-2 py-1">
                    <span className="h-px flex-1 border-t border-dashed border-rose-line" />
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne" />
                    <span className="h-px flex-1 border-t border-dashed border-rose-line" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* location */}
          <div className="border-t border-rose-line bg-ivory px-6 py-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-dusty" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-brown-mute">
                  Tempat
                </p>
                <p className="text-sm font-semibold text-brown">
                  {config.location}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-brown-mute">
                  Alamat
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-brown-mute">
                  {config.address}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <motion.a
                href={config.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mute px-4 py-2.5 text-sm font-medium text-white transition hover:bg-mute/90"
              >
                <MapPin className="h-4 w-4" />
                {t("events.viewLocation")}
              </motion.a>
            </div>
          </div>

          </motion.div>

          {Array.isArray(config.turutMengundang) &&
            config.turutMengundang.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mx-auto mt-6 max-w-md rounded-[24px] border border-rose-line bg-rosy p-8 text-center shadow-[0_20px_40px_-20px_rgba(74,52,56,0.45)]"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-dusty/70">
                  Turut Mengundang
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-champagne" />
                  <Diamond />
                  <span className="h-px w-8 bg-champagne" />
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-brown">
                  {config.turutMengundang.map((guest) => (
                    <li key={guest}>{guest}</li>
                  ))}
                </ul>
              </motion.div>
            )}
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
      <circle cx="46" cy="34" r="2.5" fill="currentColor" />
    </svg>
  );
}