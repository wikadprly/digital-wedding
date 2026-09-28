"use client";

import { useState } from "react";
import Image from "next/image";
import { useMotionPreset } from "@/lib/motion";
import Reveal from "@/components/ui/reveal";
import GalleryLightbox from "@/components/ui/gallery-lightbox";
import { Diamond } from "@/components/ui/divider";
import { Botanical } from "@/components/ui/botanical";
import { useTranslation } from "@/lib/i18n";

const GALLERY_IMAGES = [
  { src: "/images/awal%20our%20galerry.JPG", alt: "galeri-1" },
  { src: "/images/Salinan%20DSCF0077.JPG", alt: "galeri-2" },
  { src: "/images/Salinan%20DSCF0105.JPG", alt: "galeri-3" },
  { src: "/images/Salinan%20DSCF0118.JPG", alt: "galeri-4" },
  { src: "/images/our4.jpeg", alt: "galeri-5" },
];

export default function Gallery() {
  const scaleIn = useMotionPreset("scaleIn");
  const fadeUp = useMotionPreset("fadeUp");
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      id="gallery"
      className="relative mx-auto w-full max-w-[430px] overflow-hidden px-6 pb-64 pt-16"
    >
      <Botanical className="pointer-events-none absolute -left-10 bottom-24 h-40 w-40 -scale-x-100 opacity-[0.08]" />
      <Botanical className="pointer-events-none absolute -right-8 top-24 h-40 w-40 opacity-[0.08]" />

      <Reveal
        variants={fadeUp}
        amount={0.7}
        className="relative z-10 text-center"
      >
        <h2 className="font-serif text-2xl uppercase tracking-[0.22em] text-ivory">
          {t("gallery.title")}
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-champagne" />
          <Diamond />
          <span className="h-px w-8 bg-champagne" />
        </div>
      </Reveal>

      <div className="relative z-10 mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
        {GALLERY_IMAGES.map((image, i) => (
          <Reveal
            key={image.src}
            variants={scaleIn}
            amount={0.4}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { type: "spring", stiffness: 280, damping: 20 },
            }}
            whileTap={{ scale: 0.97 }}
            className={`relative w-full overflow-hidden rounded-[16px] border border-burgundy/30 bg-rosy shadow-[0_14px_28px_-18px_rgba(74,52,56,0.45)] ${
              i === 0 ? "col-span-2 h-64" : "h-44"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`${t("gallery.open")} ${i + 1}`}
              className="block h-full w-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  i === 0
                    ? "(max-width: 768px) calc(100vw - 48px), 448px"
                    : "(max-width: 768px) 50vw, 320px"
                }
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <GalleryLightbox
        images={GALLERY_IMAGES}
        index={activeIndex}
        onIndexChange={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
}
