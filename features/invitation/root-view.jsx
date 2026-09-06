"use client";

import { useState } from "react";
import { motion } from "motion/react";
import InvitationView from "./invitation-view";
import { getWeddingUid } from "@/lib/invitation-storage";
import { useTranslation } from "@/lib/i18n";

export default function RootView() {
  const { t } = useTranslation();
  const [uid] = useState(() => getWeddingUid());

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
