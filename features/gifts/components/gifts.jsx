"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Gift, Copy, Check, Landmark, Box } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useTranslation } from "@/lib/i18n";
import { useMotionPreset, staggerContainer } from "@/lib/motion";
import Reveal from "@/components/ui/reveal";

const COPIED_RESET_MS = 2000;

function CopyButton({ value, label, copiedLabel, isCopied, onCopy }) {
  return (
    <button
      type="button"
      onClick={() => onCopy(value)}
      className="flex items-center gap-1 rounded-full bg-burgundy px-3 py-1 text-xs text-white transition hover:bg-burgundy/90"
    >
      {isCopied ? (
        <>
          <Check className="h-3 w-3" /> {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> {label}
        </>
      )}
    </button>
  );
}

export default function Gifts() {
  const config = useConfig();
  const { t } = useTranslation();
  const fadeUpSpring = useMotionPreset("fadeUpSpring");
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const copiedTimerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(copiedTimerRef.current);
  }, []);

  if (!config) return null;

  const markCopied = (text) => {
    setCopied(text);
    clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => setCopied(null), COPIED_RESET_MS);
  };

  const handleCopy = async (text) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }
      markCopied(text);
    } catch {
      markCopied(null);
    }
  };

  const giftAddress = config.giftAddress;

  return (
    <section
      id="gifts"
      className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-ivory px-6 pb-28 pt-16"
    >
      <Reveal
        variants={fadeUpSpring}
        amount={0.6}
        className="relative z-10 mx-auto max-w-md rounded-[24px] bg-rosy p-8 text-center shadow-[0_20px_40px_-20px_rgba(74,52,56,0.45)]"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10">
          <Gift className="h-6 w-6 text-burgundy" />
        </div>
        <h2 className="font-serif text-3xl text-burgundy">{t("gifts.title")}</h2>
        <p className="mt-4 text-sm leading-relaxed text-brown-mute">
          {t("gifts.message")}
        </p>

        <motion.button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-full bg-burgundy px-8 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgba(86,17,18,0.6)] transition hover:bg-burgundy/90"
        >
          <Gift className="h-4 w-4" />
          {isOpen ? t("gifts.toggleClose") : t("gifts.toggleOpen")}
        </motion.button>

        {isOpen && (
          <motion.div
            variants={staggerContainer(0.18)}
            initial="hidden"
            animate="visible"
            className="mt-8 space-y-5"
          >
            {(config.banks || []).map((bank, index) => (
              <motion.div
                key={index}
                variants={fadeUpSpring}
                className="relative overflow-hidden rounded-2xl border border-rose-line bg-ivory/60 p-5 text-left"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Landmark className="h-7 w-7 text-burgundy opacity-70" />
                  <span className="font-semibold italic text-burgundy">
                    {bank.bank}
                  </span>
                </div>
                <p className="font-mono text-xl tracking-widest text-brown">
                  {bank.accountNumber || t("gifts.accountPending")}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-brown-mute">
                  {t("gifts.accountName")}: {bank.accountName}
                </p>
                {bank.accountNumber && (
                  <div className="absolute bottom-4 right-4">
                    <CopyButton
                      value={bank.accountNumber}
                      label={t("gifts.copy")}
                      copiedLabel={t("gifts.copied")}
                      isCopied={copied === bank.accountNumber}
                      onCopy={handleCopy}
                    />
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div
              variants={fadeUpSpring}
              className="relative overflow-hidden rounded-2xl border border-rose-line bg-ivory/60 p-5 text-center"
            >
              <Box className="mx-auto h-8 w-8 text-brown-mute" />
              <h3 className="mt-2 font-semibold text-brown">
                {t("gifts.physicalTitle")}
              </h3>
              <div className="mt-3 text-xs leading-relaxed text-brown-mute">
                <p>{t("gifts.physicalIntro")}</p>
                <p className="mt-2">
                  {t("gifts.receiverLabel")}:{" "}
                  <span className="font-semibold text-brown">
                    {giftAddress?.receiver || t("gifts.unknown")}
                  </span>
                </p>
                <p>
                  {t("gifts.phoneLabel")}:{" "}
                  <span className="font-semibold text-brown">
                    {giftAddress?.phone || t("gifts.unknown")}
                  </span>
                </p>
                <p className="mt-2">
                  {t("gifts.addressLabel")}:
                  <br />
                  {giftAddress?.address ? (
                    <span className="whitespace-pre-line font-semibold text-brown">
                      {giftAddress.address}
                    </span>
                  ) : (
                    t("gifts.unknown")
                  )}
                </p>
              </div>
              {giftAddress?.phone && (
                <div className="mt-4 flex justify-center">
                  <CopyButton
                    value={giftAddress.phone}
                    label={t("gifts.copyPhone")}
                    copiedLabel={t("gifts.copied")}
                    isCopied={copied === giftAddress.phone}
                    onCopy={handleCopy}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </Reveal>
    </section>
  );
}
