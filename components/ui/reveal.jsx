"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const ENTRY_MARGIN = "0px 0px -20% 0px";

export default function Reveal({
  children,
  variants,
  amount = 0.15,
  once = true,
  className = "",
  transition,
  ...rest
}) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (once && hasRevealedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!once) setState("hidden");
          return;
        }
        if (hasRevealedRef.current) return;

        const tallerThanViewport = entry.boundingClientRect.height > window.innerHeight;
        const required = tallerThanViewport ? 0 : amount;
        if (entry.intersectionRatio < required) return;

        hasRevealedRef.current = true;
        setState("visible");
      },
      { threshold: [0, amount], rootMargin: ENTRY_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, once]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={state === "visible" ? "visible" : "hidden"}
      transition={transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
