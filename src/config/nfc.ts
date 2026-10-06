import type { NfcConfig } from "@/lib/nfc";

/**
 * NFC control panel, kept deliberately in code.
 *
 * - Use `mode: "links"` for the branded page with all enabled links.
 * - Use `mode: "direct"` and change `directDestination` for a campaign.
 *
 * Changes take effect after the site is published again. The NFC tags always
 * keep the same https://espaco77.pt/redirect address.
 */
export const nfcConfig = {
  mode: "links",
  directDestination: "https://espaco77.pt/menu",
  links: [
    { id: "menu", href: "/menu", enabled: true },
    {
      id: "instagram",
      href: "https://www.instagram.com/espaco.77/",
      enabled: true,
    },
    { id: "location", href: "/localizacao", enabled: true },
  ],
} satisfies NfcConfig;
