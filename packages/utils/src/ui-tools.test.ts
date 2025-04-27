import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { cn } from "@repo/utils";

describe("ui-tools", () => {
  it("We do dummy test here", () => {
    expect(cn("cls1", "cls2")).toEqual("cls1 cls2");
    expect(cn("text-red", "text-grees")).toEqual("text-grees");
  });
});
