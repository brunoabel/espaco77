import { describe, expect, it } from "vitest";

import { isStandalonePath } from "./AppShell";

describe("isStandalonePath", () => {
  it("hides the regular site chrome only for the NFC experience", () => {
    expect(isStandalonePath("/redirect")).toBe(true);
    expect(isStandalonePath("/redirect/preview")).toBe(true);
    expect(isStandalonePath("/")).toBe(false);
    expect(isStandalonePath("/menu")).toBe(false);
  });
});
