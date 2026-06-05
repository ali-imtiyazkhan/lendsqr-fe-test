import { describe, expect, it } from "vitest";
import { formatCount, getPageNumbers, tierStars } from "./format";

describe("formatCount", () => {
  it("formats numbers with locale separators", () => {
    expect(formatCount(500)).toBe("500");
    expect(formatCount(1500)).toBe("1,500");
  });

  it("handles zero", () => {
    expect(formatCount(0)).toBe("0");
  });
});

describe("getPageNumbers", () => {
  it("returns all pages when total is 7 or fewer", () => {
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns ellipsis pattern for large page counts", () => {
    expect(getPageNumbers(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("handles first and last pages", () => {
    expect(getPageNumbers(1, 10)).toEqual([1, 2, "...", 10]);
    expect(getPageNumbers(10, 10)).toEqual([1, "...", 9, 10]);
  });
});

describe("tierStars", () => {
  it("renders filled and empty stars for valid tiers", () => {
    expect(tierStars(1)).toBe("★☆☆");
    expect(tierStars(3)).toBe("★★★");
  });

  it("handles tier 0", () => {
    expect(tierStars(0)).toBe("☆☆☆");
  });
});
