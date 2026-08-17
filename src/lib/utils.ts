import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware class name combiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Date formatter used across system labels (e.g. "27 Jul 2026"). */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  
  // Use UTC to avoid hydration mismatches between server/client timezones
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/** Short "Mon YYYY" formatter for timeline labels. */
export function formatMonthYear(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  
  // Use UTC to avoid hydration mismatches between server/client timezones
  const month = date.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${month} ${year}`;
}