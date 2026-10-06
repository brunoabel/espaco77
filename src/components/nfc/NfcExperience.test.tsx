import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { nfcCopy } from "@/i18n/nfc";
import { NfcLandingView } from "./NfcExperience";

const links = [
  { id: "menu" as const, href: "/menu", enabled: true },
  {
    id: "instagram" as const,
    href: "https://www.instagram.com/espaco.77/",
    enabled: true,
  },
  { id: "location" as const, href: "/localizacao", enabled: true },
];

describe("NfcLandingView", () => {
  it("renders the approved Portuguese links and destinations", () => {
    const html = renderToStaticMarkup(
      <NfcLandingView
        variant="links"
        links={links}
        lang="pt"
        copy={nfcCopy.pt}
        onLanguageChange={() => undefined}
      />,
    );

    expect(html).toContain("A NOITE COMEÇA AQUI.");
    expect(html).toContain("Ver o menu");
    expect(html).toContain('href="/menu"');
    expect(html).toContain('href="https://www.instagram.com/espaco.77/"');
    expect(html).toContain("Como chegar");
    expect(html).toContain('href="/localizacao"');
  });

  it("renders only the app-opening action in Instagram mode", () => {
    const html = renderToStaticMarkup(
      <NfcLandingView
        variant="instagram"
        instagramHref="https://www.instagram.com/p/ABC123/"
        links={links}
        lang="en"
        copy={nfcCopy.en}
        onLanguageChange={() => undefined}
      />,
    );

    expect(html).toContain("OPEN INSTAGRAM");
    expect(html).toContain('href="https://www.instagram.com/p/ABC123/"');
    expect(html).not.toContain('href="/menu"');
    expect(html).not.toContain('href="/localizacao"');
  });

  it("excludes disabled links", () => {
    const html = renderToStaticMarkup(
      <NfcLandingView
        variant="links"
        links={links.map((link) =>
          link.id === "instagram" ? { ...link, enabled: false } : link,
        )}
        lang="es"
        copy={nfcCopy.es}
        onLanguageChange={() => undefined}
      />,
    );

    expect(html).not.toContain("instagram.com");
    expect(html).toContain("Ver el menú");
  });

  it.each(["javascript:alert('xss')", "/\\evil.example/path"])(
    "excludes unsafe configured link %s",
    (href) => {
      const html = renderToStaticMarkup(
        <NfcLandingView
          variant="links"
          links={[{ id: "menu", href, enabled: true }]}
          lang="pt"
          copy={nfcCopy.pt}
          onLanguageChange={() => undefined}
        />,
      );

      expect(html).not.toContain("href=");
    },
  );
});
