"use client";

import { useTranslation } from "@/lib/i18n";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useMotionPreset, staggerContainer } from "@/lib/motion";

export default function Location() {
  const config = useConfig();
  const { t } = useTranslation();
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");

  if (!config) return null;

  return (
    <section id="location" className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        <div className="text-center space-y-3">
          <motion.div variants={scaleIn}>
            <span className="inline-block px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200">
              {t("location.eventVenue")}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-serif text-gray-800"
          >
            {t("location.title")}
          </motion.h2>
        </div>

        <motion.div
          variants={fadeUp}
          className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="font-serif text-lg text-gray-800">
                  {config.location}
                </p>
                <p className="text-sm text-gray-500">{config.address}</p>
              </div>
            </div>

            <a
              href={config.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {t("location.viewMap")}
            </a>
          </div>

          {config.maps_embed && (
            <div className="relative w-full h-64">
              <iframe
                src={config.maps_embed}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="map"
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
