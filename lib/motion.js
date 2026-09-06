import { useReducedMotion } from "motion/react";

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
};

export const LOOP = {
  nudge: 1.5,
  pulse: 2,
  float: 4,
};

export const EASE = {
  out: "easeOut",
  inOut: "easeInOut",
};

export const LIFT = 20;

export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.base, ease: EASE.inOut },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: LIFT },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: LIFT,
    transition: { duration: DURATION.base, ease: EASE.inOut },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: DURATION.base, ease: EASE.inOut },
  },
};

export const pageEnter = {
  hidden: { opacity: 0, y: LIFT },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

export const pageExit = {
  opacity: 0,
  y: -LIFT,
  transition: { duration: DURATION.slow, ease: EASE.inOut },
};

export const staggerContainer = (step = DURATION.fast) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: step },
  },
});

export const stagger = (index, step = DURATION.fast) => ({
  duration: DURATION.base,
  ease: EASE.out,
  delay: index * step,
});

const REDUCED = {
  fade,
  fadeUp: fade,
  scaleIn: fade,
  pageEnter: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  pageExit: { opacity: 0 },
};

const FULL = { fade, fadeUp, scaleIn, pageEnter, pageExit };

export function useReducedMotionFlag() {
  return Boolean(useReducedMotion());
}

export function useMotionPreset(name) {
  const reduced = useReducedMotion();
  const source = reduced ? REDUCED : FULL;
  return source[name] ?? FULL.fade;
}
