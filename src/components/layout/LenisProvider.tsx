"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function scrollToElement(
  element: HTMLElement | null,
  offset = -84,
): void {
  if (!element) return;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY + offset,
    behavior: "smooth",
  });
}

const ScrollContext = createContext<(id: string) => void>(() => undefined);

export function useScrollToId(): (id: string) => void {
  return useContext(ScrollContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(instance);

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  const scrollToId = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;
      if (lenis && !reduced) {
        lenis.scrollTo(element, { offset: -84, duration: 1.4 });
      } else {
        scrollToElementFallback(element);
      }
    },
    [lenis, reduced],
  );

  return (
    <ScrollContext.Provider value={scrollToId}>{children}</ScrollContext.Provider>
  );
}

function scrollToElementFallback(element: HTMLElement) {
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}