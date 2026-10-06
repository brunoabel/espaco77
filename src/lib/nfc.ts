export type NfcMode = "links" | "direct";

export type NfcLinkId = "menu" | "instagram" | "location";

export interface NfcLink {
  id: NfcLinkId;
  href: string;
  enabled: boolean;
}

export interface NfcConfig {
  mode: NfcMode;
  directDestination: string;
  links: NfcLink[];
}

export type NfcAction =
  | { type: "links" }
  | { type: "redirect"; href: string }
  | { type: "instagram"; href: string };

const siteOrigin = "https://espaco77.pt";

function isInstagramHostname(hostname: string) {
  return hostname === "instagram.com" || hostname.endsWith(".instagram.com");
}

export function getSafeNfcHref(value: string) {
  const href = value.trim();

  if (!href || href.includes("\\") || /[\u0000-\u001f]/.test(href)) {
    return null;
  }

  try {
    if (href.startsWith("/") && !href.startsWith("//")) {
      const url = new URL(href, siteOrigin);
      return url.origin === siteOrigin ? href : null;
    }

    const url = new URL(href);

    if (url.protocol !== "https:" || url.username || url.password) {
      return null;
    }

    return href;
  } catch {
    return null;
  }
}

export function getNfcAction(config: NfcConfig): NfcAction {
  if (config.mode === "links") {
    return { type: "links" };
  }

  const destination = getSafeNfcHref(config.directDestination);

  if (!destination) {
    return { type: "links" };
  }

  if (destination.startsWith("/")) {
    return { type: "redirect", href: destination };
  }

  try {
    const url = new URL(destination);

    if (isInstagramHostname(url.hostname.toLowerCase())) {
      return { type: "instagram", href: destination };
    }

    return { type: "redirect", href: destination };
  } catch {
    return { type: "links" };
  }
}
