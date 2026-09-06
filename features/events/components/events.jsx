"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { formatEventDate } from "@/lib/format-event-date";
import { useMotionPreset, staggerContainer } from "@/lib/motion";

export default function Events() {
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");

  if (!config) return null;

  const dateLabel = formatEventDate(config.date, "full");
  const timeLabel = config.time || "10.00 WIB";

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-gradient-to-b from-[#7a1b3a] via-[#8a2044] to-[#5c1029] px-6 py-16"
    >
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="mb-8 text-left text-white">
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl tracking-widest"
          >
            SAVE
          </motion.h2>
          <motion.h2
            variants={fadeUp}
            className="-mt-3 ml-8 font-serif text-4xl italic"
          >
            The Date
          </motion.h2>
          <motion.hr
            variants={fade}
            className="mt-2 w-2/3 border-t border-white/50"
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-white pb-32 shadow-2xl"
      >
        <div className="relative h-64 w-full">
          <Image
            src="/couple.png"
            alt={`${config.groomName} & ${config.brideName}`}
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/10" />
        </div>

        <div className="px-6 pt-8 text-center">
          <h3 className="font-serif text-2xl uppercase tracking-widest text-[#7a1b3a]">
            Akad &amp; Resepsi
          </h3>

          <div className="mx-auto mt-4 w-3/4 border-b border-gray-300 pb-4">
            <p className="text-sm font-bold uppercase tracking-widest text-[#7a1b3a]">
              {dateLabel}
            </p>
          </div>

          <p className="mt-4 text-sm font-semibold text-[#7a1b3a]">
            Pukul : {timeLabel}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            Tempat : Jalan Mawar Penggalang RT 01 RW 04, No. 12,
            <br />
            Kec. Adipala, Kab. Cilacap
          </p>

          <a
            href={config.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#8c3b4a] px-6 py-2.5 text-sm text-white shadow-md transition hover:opacity-90"
          >
            <MapPin className="h-4 w-4" />
            Lihat Lokasi
          </a>
        </div>

        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#7a1b3a]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e8c98a] via-[#fff3d6] to-[#e8c98a]" />
      </motion.div>
    </section>
  );
}
