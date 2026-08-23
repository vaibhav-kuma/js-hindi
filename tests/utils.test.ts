import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("combines class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", true && "bar")).toBe("foo bar");
    expect(cn("foo", false && "bar")).toBe("foo");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("p-2 p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("", "", "foo")).toBe("foo");
  });

  it("handles arrays and objects", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });
});