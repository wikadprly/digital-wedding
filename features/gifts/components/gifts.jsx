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
      className="relative overflow-hidden bg-ivory px-6 pb-28 pt-16"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 mx-auto max-w-md rounded-[24px] bg-rosy p-8 text-center shadow-[0_20px_40px_-20px_rgba(74,52,56,0.45)]"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10">
          <Gift className="h-6 w-6 text-burgundy" />
        </div>
        <h2 className="font-serif text-3xl text-burgundy">Wedding Gift</h2>
        <p className="mt-4 text-sm leading-relaxed text-brown-mute">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan
          jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado
          secara cashless.
        </p>

        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-full bg-burgundy px-8 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgba(86,17,18,0.6)] transition hover:bg-burgundy/90"
        >
          <Gift className="h-4 w-4" />
          {isOpen ? "Tutup" : "Klik Disini"}
        </motion.button>

        {isOpen && (
          <div className="mt-8 space-y-5">
            {(config.banks || []).map((bank, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-rose-line bg-ivory/60 p-5 text-left"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Landmark className="h-7 w-7 text-burgundy opacity-70" />
                  <span className="font-semibold italic text-burgundy">
                    {bank.bank}
                  </span>
                </div>
                <p className="font-mono text-xl tracking-widest text-brown">
                  {bank.accountNumber || "Nomor menyusul"}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-brown-mute">
                  {bank.accountName}
                </p>
                {bank.accountNumber && (
                  <button
                    onClick={() => handleCopy(bank.accountNumber)}
                    className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-burgundy px-3 py-1 text-xs text-white transition hover:bg-burgundy/90"
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
                )}
              </div>
            ))}

            <div className="relative overflow-hidden rounded-2xl border border-rose-line bg-ivory/60 p-5 text-center">
              <Box className="mx-auto h-8 w-8 text-brown-mute" />
              <h3 className="mt-2 font-semibold text-brown">Kirim Hadiah</h3>
              <div className="mt-3 text-xs leading-relaxed text-brown-mute">
                <p>
                  Nama Penerima :{" "}
                  <span className="font-semibold text-brown">
                    {giftAddress?.receiver || "-"}
                  </span>
                </p>
                <p>
                  Nomor HP :{" "}
                  <span className="font-semibold text-brown">
                    {giftAddress?.phone || "-"}
                  </span>
                </p>
                <p className="mt-2">
                  Alamat Kirim Hadiah :
                  <br />
                  {giftAddress?.address ? (
                    <span className="whitespace-pre-line font-semibold text-brown">
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
                  className="mx-auto mt-4 flex items-center justify-center gap-1 rounded-full bg-burgundy px-4 py-1.5 text-xs text-white transition hover:bg-burgundy/90"
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
