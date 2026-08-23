import { describe, it, expect } from "vitest";
import { formatDate, formatMonthYear } from "@/lib/utils";

describe("formatDate", () => {
  it("formats ISO date correctly", () => {
    expect(formatDate("2026-07-27T13:36:24Z")).toBe("27 Jul 2026");
    expect(formatDate("2026-01-01T00:00:00Z")).toBe("01 Jan 2026");
    expect(formatDate("2026-12-31T23:59:59Z")).toBe("31 Dec 2026");
  });

  it("handles invalid dates gracefully", () => {
    expect(formatDate("invalid")).toBe("invalid");
    expect(formatDate("")).toBe("");
  });

  it("pads single-digit days", () => {
    expect(formatDate("2026-07-05T00:00:00Z")).toBe("05 Jul 2026");
  });
});

describe("formatMonthYear", () => {
  it("formats ISO date to Mon YYYY", () => {
    expect(formatMonthYear("2026-07-27T13:36:24Z")).toBe("Jul 2026");
    expect(formatMonthYear("2026-01-01T00:00:00Z")).toBe("Jan 2026");
    expect(formatMonthYear("2026-12-31T23:59:59Z")).toBe("Dec 2026");
  });

  it("handles invalid dates gracefully", () => {
    expect(formatMonthYear("invalid")).toBe("invalid");
    expect(formatMonthYear("")).toBe("");
  });
});