"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import InvitationView from "./invitation-view";
import { getWeddingUid } from "@/lib/invitation-storage";
import { useTranslation } from "@/lib/i18n";

const subscribeToStorage = () => () => {};
const getClientSnapshot = () => getWeddingUid();
const getServerSnapshot = () => null;

export default function RootView() {
  const { t } = useTranslation();
  const uid = useSyncExternalStore(
    subscribeToStorage,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (uid) {
    return <InvitationView uid={uid} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 max-w-md"
      >
        <h1 className="font-serif text-3xl text-gray-800">
          {t("app.errorTitle")}
        </h1>
        <p className="text-gray-500">{t("app.errorDesc")}</p>
        <p className="text-sm text-gray-400">
          Contoh: <code className="rounded bg-rose-50 px-2 py-0.5">/uid-tamu</code>
        </p>
      </motion.div>
    </div>
  );
}