import { describe, expect, it } from "vitest";

import { nfcConfig } from "../config/nfc";
import { getNfcAction, type NfcConfig } from "./nfc";

function config(overrides: Partial<NfcConfig> = {}): NfcConfig {
  return {
    mode: "links",
    directDestination: "https://espaco77.pt/menu",
    links: [],
    ...overrides,
  };
}

describe("getNfcAction", () => {
  it("shows the links page when links mode is selected", () => {
    expect(getNfcAction(config())).toEqual({ type: "links" });
  });

  it("redirects to a safe internal path", () => {
    expect(
      getNfcAction(config({ mode: "direct", directDestination: "/menu" })),
    ).toEqual({ type: "redirect", href: "/menu" });
  });

  it("redirects to a regular HTTPS website", () => {
    expect(
      getNfcAction(
        config({
          mode: "direct",
          directDestination: "https://example.com/campaign",
        }),
      ),
    ).toEqual({ type: "redirect", href: "https://example.com/campaign" });
  });

  it.each([
    "https://instagram.com/espaco.77",
    "https://www.instagram.com/p/ABC123/",
    "https://m.instagram.com/reel/ABC123/",
  ])("shows an app-opening screen for Instagram URL %s", (href) => {
    expect(
      getNfcAction(config({ mode: "direct", directDestination: href })),
    ).toEqual({ type: "instagram", href });
  });

  it("does not mistake a deceptive hostname for Instagram", () => {
    const href = "https://instagram.com.example.org/campaign";

    expect(
      getNfcAction(config({ mode: "direct", directDestination: href })),
    ).toEqual({ type: "redirect", href });
  });

  it.each([
    "",
    "menu",
    "//example.com/campaign",
    "/\\evil.example/campaign",
    "javascript:alert('xss')",
    "http://example.com/campaign",
    "ftp://example.com/file",
  ])("falls back to the links page for unsafe destination %s", (href) => {
    expect(
      getNfcAction(config({ mode: "direct", directDestination: href })),
    ).toEqual({ type: "links" });
  });
});

describe("nfcConfig", () => {
  it("starts in links mode with the three approved destinations", () => {
    expect(nfcConfig.mode).toBe("links");
    expect(nfcConfig.links).toEqual([
      { id: "menu", href: "/menu", enabled: true },
      {
        id: "instagram",
        href: "https://www.instagram.com/espaco.77/",
        enabled: true,
      },
      { id: "location", href: "/localizacao", enabled: true },
    ]);
  });
});
