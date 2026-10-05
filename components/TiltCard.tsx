"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, 18]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  if (reduce) return <div ref={ref} className="min-w-0 max-w-full overflow-hidden">{children}</div>;

  return (
    <m.div
      ref={ref}
      className="min-w-0 max-w-full"
      style={{ y }}
      whileHover={{ rotateX: 2, rotateY: -2, transformPerspective: 900 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {children}
    </m.div>
  );
}
