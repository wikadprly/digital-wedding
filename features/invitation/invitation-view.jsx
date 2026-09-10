"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import LandingPage from "@/features/invitation/components/landing-page";
import MainContent from "@/features/invitation/components/main-content";
import MusicButton from "@/features/invitation/components/music-button";
import BottomNav from "@/features/invitation/components/bottom-nav";
import { InvitationProvider } from "@/features/invitation/invitation-context";
import { useTranslation } from "@/lib/i18n";

function InvitationViewInner({ uid }) {
  const { t } = useTranslation();
  const config = useConfig();
  const audioRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSrc = config?.audio?.src || "/audio/fulfilling-humming.mp3";

  const openInvitation = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    setIsOpened(true);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const pauseAudio = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    const onVisibility = () => {
      if (document.hidden) pauseAudio();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", pauseAudio);
    window.addEventListener("beforeunload", pauseAudio);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", pauseAudio);
      window.removeEventListener("beforeunload", pauseAudio);
    };
  }, []);

  useEffect(() => {
    const { autoplay = true } = config?.audio || {};
    if (!autoplay) return;

    const audio = audioRef.current;
    if (!audio || typeof window === "undefined") return;

    let cancelled = false;

    const resume = () => {
      if (cancelled) return;
      audio.muted = false;
      audio
        .play()
        .then(() => {
          if (!cancelled) setIsPlaying(true);
        })
        .catch(() => {});
      window.removeEventListener("pointerdown", resume, true);
      window.removeEventListener("touchstart", resume, true);
      window.removeEventListener("keydown", resume, true);
    };

    audio
      .play()
      .then(() => {
        if (!cancelled) setIsPlaying(true);
      })
      .catch(() => {
        if (cancelled) return;
        audio.muted = true;
        audio.play().catch(() => {});
        window.addEventListener("pointerdown", resume, true);
        window.addEventListener("touchstart", resume, true);
        window.addEventListener("keydown", resume, true);
      });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", resume, true);
      window.removeEventListener("touchstart", resume, true);
      window.removeEventListener("keydown", resume, true);
    };
  }, [config]);

  if (!uid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-2">
          <p className="font-serif text-2xl text-gray-800">
            {t("app.errorTitle")}
          </p>
          <p className="text-gray-500">{t("app.errorDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div key="landing" exit={{ opacity: 0 }}>
            <LandingPage onOpenInvitation={openInvitation} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <MainContent />
            <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />
          </motion.div>
        )}
      </AnimatePresence>

      {isOpened && <BottomNav />}
    </>
  );
}

export default function InvitationView({ uid }) {
  return (
    <InvitationProvider uid={uid}>
      <InvitationViewInner uid={uid} />
    </InvitationProvider>
  );
}
