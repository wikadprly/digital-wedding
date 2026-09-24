"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function Reveal({
  children,
  variants,
  amount = 0.55,
  className = "",
  transition,
  ...rest
}) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");
  const stateRef = useRef("hidden");

  const syncState = (next) => {
    if (stateRef.current === next) return;
    stateRef.current = next;
    setState(next);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enter = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && stateRef.current === "hidden") {
          syncState("visible");
        }
      },
      { threshold: amount }
    );

    const exit = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && stateRef.current === "visible") {
          syncState("hidden");
        }
      },
      { threshold: 0 }
    );

    enter.observe(el);
    exit.observe(el);
    return () => {
      enter.disconnect();
      exit.disconnect();
    };
  }, [amount]);

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