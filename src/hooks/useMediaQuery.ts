"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook — returns `defaultValue` (false / the provided
 * default) until the browser confirms the match, avoiding hydration mismatches.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Hard-core viewport breakpoints used by the layout. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px) and (hover: hover)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)", true);
}