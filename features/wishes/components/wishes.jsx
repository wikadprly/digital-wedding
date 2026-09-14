"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Trash2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useMotionPreset } from "@/lib/motion";
import { useWishes } from "@/features/wishes/hooks/use-wishes";
import { getWishToken } from "@/lib/wish-storage";
import Confetti from "@/components/ui/confetti";

const ATTENDANCE_OPTIONS = [
  { value: "attending", key: "wishes.attending", icon: "check" },
  { value: "not_attending", key: "wishes.notAttending", icon: "x" },
  { value: "maybe", key: "wishes.maybe", icon: "?" },
];

function AttendanceIcon({ type }) {
  switch (type) {
    case "attending":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    case "not_attending":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    default:
      return <span className="text-sm font-bold">?</span>;
  }
}

export default function Wishes() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { uid, wishes, isLoading, setSubmittedWish, createMutation, deleteMutation } =
    useWishes();
  const fadeUp = useMotionPreset("fadeUp");

  const data = Array.isArray(wishes) ? wishes : [];
  const ownWish = uid && getWishToken(uid);

  const handleDelete = (wishId) => {
    if (window.confirm(t("wishes.deleteConfirm"))) {
      deleteMutation.mutate(wishId);
    }
  };

  const count = (value) =>
    data.filter((w) => (w.attendance || "").toLowerCase() === value).length;
  const attending = count("attending");
  const notAttending = count("not_attending");

  const attendanceLabel = (value) => {
    const v = (value || "").toLowerCase();
    const option = ATTENDANCE_OPTIONS.find((o) => o.value === v);
    return option ? t(option.key) : value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    try {
      const wishData = {
        name: formData.name,
        attendance: formData.attendance || "attending",
        message: formData.message,
      };
      await createMutation.mutateAsync(wishData);
      setSubmittedWish(formData.name);
      setFormData({ name: "", attendance: "", message: "" });
      setShowSuccess(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      if (err.code === "WISH_ALREADY_EXISTS") {
        setSubmittedWish(formData.name);
        setShowSuccess(true);
      }
    }
  };

  return (
    <section
      id="wishes"
      className="relative overflow-hidden bg-dusty px-6 pb-28 pt-16"
    >
      <Confetti show={showConfetti} />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-md rounded-[24px] bg-rosy p-8 shadow-[0_20px_40px_-20px_rgba(74,52,56,0.45)]"
      >
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-dusty/10">
            <Heart className="h-6 w-6 text-dusty" />
          </div>
          <h2 className="font-serif text-3xl text-dusty">{t("wishes.title")}</h2>
          <p className="mt-2 text-xs font-semibold text-brown-mute">
            {data.length} {t("wishes.title").toLowerCase()}
          </p>
        </div>

        <div className="mt-4 flex gap-4">
          <div className="w-1/2 rounded-xl bg-[#e7f2e4] py-3 text-center text-[#3f6b3a]">
            <span className="block text-xl font-bold">{attending}</span>
            <span className="text-xs">{t("wishes.attending")}</span>
          </div>
          <div className="w-1/2 rounded-xl bg-rose-line/40 py-3 text-center text-brown">
            <span className="block text-xl font-bold">{notAttending}</span>
            <span className="text-xs">{t("wishes.notAttending")}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t("wishes.namePlaceholder")}
            required
            className="w-full rounded-lg border border-rose-line bg-ivory/40 p-3 text-sm focus:border-dusty focus:outline-none"
          />
          <select
            value={formData.attendance}
            onChange={(e) =>
              setFormData({ ...formData, attendance: e.target.value })
            }
            className="w-full rounded-lg border border-rose-line bg-ivory/40 p-3 text-sm text-brown-mute focus:border-dusty focus:outline-none"
          >
            <option value="">{t("wishes.attendancePlaceholder")}</option>
            {ATTENDANCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.key)}
              </option>
            ))}
          </select>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder={t("wishes.wishPlaceholder")}
            required
            className="w-full rounded-lg border border-rose-line bg-ivory/40 p-3 text-sm focus:border-dusty focus:outline-none"
          />
          <motion.button
            type="submit"
            disabled={createMutation.isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full rounded-xl bg-dusty py-3 text-sm font-bold text-white transition hover:bg-dusty/90 disabled:opacity-50"
          >
            {createMutation.isPending ? t("wishes.sending") : t("wishes.sendButton")}
          </motion.button>
        </form>
      </motion.div>

      <div className="mx-auto mt-8 max-w-md space-y-3">
        {isLoading ? (
          <div className="rounded-2xl bg-rosy p-6 text-center text-sm text-dusty">
            {t("app.loading")}
          </div>
        ) : data.length > 0 ? (
          data.map((wish) => (
            <motion.div
              key={wish.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: "0 12px 24px -14px rgba(74,52,56,0.35)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-2xl bg-rosy p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-dusty">{wish.name}</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-dusty/10 px-2 py-0.5 text-xs text-dusty">
                    <AttendanceIcon type={wish.attendance} />
                    {attendanceLabel(wish.attendance)}
                  </span>
                  {ownWish && ownWish.wishId === wish.id && (
                    <motion.button
                      type="button"
                      onClick={() => handleDelete(wish.id)}
                      disabled={deleteMutation.isPending}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      aria-label={t("wishes.delete")}
                      className="rounded-full bg-rose-line/50 p-1.5 text-brown-mute hover:bg-rose-line hover:text-dusty disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </span>
              </div>
              <p className="mt-1 text-sm text-brown-mute">{wish.message}</p>
            </motion.div>
          ))
        ) : (
          <div className="rounded-2xl bg-rosy p-6 text-center text-sm text-dusty">
            {t("wishes.emptyState")}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dusty/10">
                <CheckIcon />
              </div>
              <h3 className="font-serif text-xl text-brown">
                {t("wishes.thankYou")}
              </h3>
              <p className="text-sm text-brown-mute">{t("wishes.successMessage")}</p>
              {createMutation.error?.code === "WISH_ALREADY_EXISTS" && (
                <p className="text-sm text-dusty">{t("wishes.oneMessageLimit")}</p>
              )}
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full rounded-xl bg-dusty py-2.5 font-medium text-white transition hover:bg-dusty/90"
              >
                {t("wishes.close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="h-8 w-8 text-dusty" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
