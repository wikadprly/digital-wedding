"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset } from "@/lib/motion";

export default function Closing() {
  const config = useConfig();
  const fadeUp = useMotionPreset("fadeUp");

  if (!config) return null;

  return (
    <section className="bg-white pb-32 text-center">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src="/couple.png"
          alt="Closing"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white to-transparent pb-4">
          <h2 className="font-serif text-xl tracking-widest text-[#7a1b3a]">
            TERIMAKASIH
          </h2>
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 pt-4"
      >
        <p className="text-sm text-[#7a1b3a]">
          Telah menjadi bagian dari momen bahagia kami
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#7a1b3a]">
          {config.groomName} &amp; {config.brideName}
        </h1>
      </motion.div>

      <div className="mt-16 flex flex-col items-center gap-3">
        <p className="text-xs text-gray-500">
          Made with <span className="text-rose-500">♥</span> by{" "}
          <span className="font-bold text-[#7a1b3a]">Wika Dwi Aprilia</span>
        </p>
        <div className="flex gap-4 text-gray-400">
          <a href="#" aria-label="Instagram" className="hover:text-[#7a1b3a]">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp" className="hover:text-[#7a1b3a]">
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
