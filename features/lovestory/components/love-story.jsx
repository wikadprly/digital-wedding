"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset, staggerContainer } from "@/lib/motion";

export default function LoveStory() {
  const config = useConfig();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");

  if (!config) return null;

  return (
    <section id="lovestory" className="relative overflow-hidden bg-gradient-to-b from-[#7a1b3a] via-[#8a2044] to-[#5c1029] px-6 py-16 text-center text-white">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div variants={fadeUp} className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/couple.png"
            alt="Love Story"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5c1029]/50 to-transparent" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mb-6 mt-8 font-serif text-3xl uppercase tracking-widest"
        >
          Love Story
        </motion.h2>

        <motion.div variants={fade} className="space-y-6 px-2 text-sm leading-relaxed text-rose-100/90">
          <p>
            Tidak ada yang kebetulan di dunia ini.
            <br />
            Kami dipertemukan oleh waktu, dipersatukan oleh cerita, dan dipertahankan oleh doa.
          </p>
          <p>
            Berawal dari sapaan sederhana, lalu tumbuh menjadi hubungan yang penuh tawa, dukungan, dan perjalanan bersama. Kami belajar memahami, menerima kekurangan satu sama lain, dan saling menguatkan dalam setiap langkah kehidupan.
          </p>
          <p>
            Hari demi hari berlalu, hingga akhirnya kami menyadari bahwa rumah terbaik adalah ketika kami bersama.
          </p>
          <p>
            Dan kini, dengan penuh rasa syukur, kami memutuskan untuk melangkah ke babak baru dalam sebuah ikatan suci pernikahan.
          </p>
          <p className="mt-6 font-bold tracking-wide text-[#e8c98a]">
            &ldquo;Two souls, one journey, forever begins here.&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
