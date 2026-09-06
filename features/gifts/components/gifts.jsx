"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Gift, Copy, Check, Landmark, Box } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useMotionPreset } from "@/lib/motion";

export default function Gifts() {
  const config = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const fadeUp = useMotionPreset("fadeUp");

  if (!config) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const giftAddress = config.giftAddress;

  return (
    <section
      id="gifts"
      className="relative bg-gradient-to-b from-[#7a1b3a] via-[#8a2044] to-[#5c1029] px-6 py-16"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-md rounded-[30px] bg-[#FDFBF7] p-8 text-center shadow-xl"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#7a1b3a]/10">
          <Gift className="h-6 w-6 text-[#7a1b3a]" />
        </div>
        <h2 className="font-serif text-3xl text-[#7a1b3a]">Wedding Gift</h2>
        <p className="mt-4 text-sm leading-relaxed text-[#7a1b3a]/90">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan
          jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado
          secara cashless.
        </p>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-full bg-[#8c3b4a] px-8 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
        >
          <Gift className="h-4 w-4" />
          {isOpen ? "Tutup" : "Klik Disini"}
        </button>

        {isOpen && (
          <div className="mt-8 space-y-5">
            {(config.banks || []).map((bank, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Landmark className="h-7 w-7 text-yellow-500 opacity-80" />
                  <span className="font-bold italic text-[#7a1b3a]">
                    {bank.bank}
                  </span>
                </div>
                <p className="font-mono text-xl tracking-widest text-gray-800">
                  {bank.accountNumber}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-gray-500">
                  {bank.accountName}
                </p>
                <button
                  onClick={() => handleCopy(bank.accountNumber)}
                  className="absolute bottom-4 right-4 flex items-center gap-1 rounded bg-gray-400 px-3 py-1 text-xs text-white hover:bg-gray-500"
                >
                  {copied === bank.accountNumber ? (
                    <>
                      <Check className="h-3 w-3" /> TerSalin
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            ))}

            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm">
              <Box className="mx-auto h-8 w-8 text-gray-700" />
              <h3 className="mt-2 font-bold text-gray-800">Kirim Hadiah</h3>
              <div className="mt-3 text-xs leading-relaxed text-gray-600">
                <p>
                  Nama Penerima :{" "}
                  <span className="font-semibold">
                    {giftAddress?.receiver || "-"}
                  </span>
                </p>
                <p>
                  Nomor HP :{" "}
                  <span className="font-semibold">
                    {giftAddress?.phone || "-"}
                  </span>
                </p>
                <p className="mt-2">
                  Alamat Kirim Hadiah :
                  <br />
                  {giftAddress?.address ? (
                    <span className="whitespace-pre-line font-semibold">
                      {giftAddress.address}
                    </span>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
              {giftAddress?.phone && (
                <button
                  onClick={() => handleCopy(giftAddress.phone)}
                  className="mx-auto mt-4 flex items-center justify-center gap-1 rounded bg-gray-400 px-4 py-1.5 text-xs text-white hover:bg-gray-500"
                >
                  {copied === giftAddress.phone ? (
                    <>
                      <Check className="h-3 w-3" /> TerSalin
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy No. HP
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
