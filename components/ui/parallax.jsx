"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function Parallax({
  children,
  speed = 0.35,
  fade = true,
  className = "",
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [
    `${speed * 10}%`,
    `-${speed * 10}%`,
  ]);

  return (
    <motion.div
      ref={ref}
      initial={fade ? { opacity: 0 } : false}
      animate={fade ? { opacity: 1 } : undefined}
      transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={shouldReduce ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[10%]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}