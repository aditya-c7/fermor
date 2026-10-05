"use client";

import { useSyncExternalStore } from "react";
import { FlickeringGrid } from "./ui/flickering-grid";

const MASK =
  "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 75%)";
const COLOR = "rgb(27, 67, 50)";

const REDUCED = "(prefers-reduced-motion: reduce)";

const mediaQuery = () => window.matchMedia(REDUCED);

// useSyncExternalStore avoids the setState-in-effect pass that a plain
// useEffect listener would cause on first paint.
function subscribe(callback: () => void) {
  const query = mediaQuery();
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const getSnapshot = () => mediaQuery().matches;
const getServerSnapshot = () => false;

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function HeroBackdrop() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          maskImage: MASK,
          WebkitMaskImage: MASK,
          backgroundImage: `radial-gradient(${COLOR} 1px, transparent 1.5px)`,
          backgroundSize: "10px 10px",
          opacity: 0.12,
        }}
      />
    );
  }

  return (
    <FlickeringGrid
      aria-hidden="true"
      className="absolute inset-0"
      color={COLOR}
      squareSize={4}
      gridGap={6}
      maxOpacity={0.12}
      flickerChance={0.25}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    />
  );
}