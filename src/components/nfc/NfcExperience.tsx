"use client";

import { ArrowUpRight, AtSign, Beer, MapPin } from "lucide-react";

import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/dictionaries";
import { nfcCopy, type NfcCopy } from "@/i18n/nfc";
import { getSafeNfcHref, type NfcLink } from "@/lib/nfc";

type LandingVariant = "links" | "instagram";

interface NfcLandingViewProps {
  variant: LandingVariant;
  links: readonly NfcLink[];
  instagramHref?: string;
  lang: Language;
  copy: NfcCopy;
  onLanguageChange: (language: Language) => void;
}

const languageOptions: Language[] = ["pt", "en", "es"];
const linkIcons = { menu: Beer, instagram: AtSign, location: MapPin };

export function NfcLandingView({
  variant,
  links,
  instagramHref,
  lang,
  copy,
  onLanguageChange,
}: NfcLandingViewProps) {
  const isInstagramOnly = variant === "instagram";
  const safeLinks = links.flatMap((link) => {
    const href = getSafeNfcHref(link.href);
    return link.enabled && href ? [{ ...link, href }] : [];
  });

  return (
    <main className="nfc-page">
      <div className="nfc-grid" aria-hidden="true" />
      <div className="nfc-ghost" aria-hidden="true">77</div>

      <section className="nfc-card" aria-labelledby="nfc-title">
        <header className="nfc-header">
          <Logo size={0.72} />
          <div className="nfc-rule" aria-hidden="true" />
          <div className="nfc-languages" role="group" aria-label={copy.languageLabel}>
            {languageOptions.map((language) => (
              <button
                key={language}
                type="button"
                className="nfc-language"
                data-active={language === lang}
                aria-pressed={language === lang}
                onClick={() => onLanguageChange(language)}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <div className="nfc-copy">
          <p className="nfc-eyebrow">{copy.eyebrow}</p>
          <h1 id="nfc-title">{isInstagramOnly ? copy.instagramTitle : copy.title}</h1>
          <p className="nfc-subtitle">
            {isInstagramOnly ? copy.instagramDescription : copy.subtitle}
          </p>
        </div>

        <div className="nfc-actions">
          {isInstagramOnly && instagramHref ? (
            <NfcLinkItem
              href={instagramHref}
              label={copy.openInstagram}
              hint={copy.tapHint}
              icon={AtSign}
              primary
            />
          ) : (
            safeLinks.map((link) => (
              <NfcLinkItem
                key={link.id}
                href={link.href}
                label={copy.linkLabels[link.id]}
                hint={copy.tapHint}
                icon={linkIcons[link.id]}
                primary={link.id === "menu"}
                external={link.id === "instagram"}
              />
            ))
          )}
        </div>

        <footer className="nfc-footer">
          <span>TRAVESSA DE CEDOFEITA</span>
          <span aria-hidden="true">77</span>
          <span>PORTO</span>
        </footer>
      </section>

      <style>{styles}</style>
    </main>
  );
}

function NfcLinkItem({
  href,
  label,
  hint,
  icon: Icon,
  primary = false,
  external = false,
}: {
  href: string;
  label: string;
  hint: string;
  icon: typeof Beer;
  primary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      className={`nfc-link${primary ? " nfc-link-primary" : ""}`}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="nfc-icon" aria-hidden="true"><Icon /></span>
      <span className="nfc-link-copy">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
      <ArrowUpRight className="nfc-arrow" aria-hidden="true" />
    </a>
  );
}

interface NfcExperienceProps {
  variant: LandingVariant;
  links: readonly NfcLink[];
  instagramHref?: string;
}

export default function NfcExperience(props: NfcExperienceProps) {
  const { lang, setLang } = useLanguage();

  return (
    <NfcLandingView
      {...props}
      lang={lang}
      copy={nfcCopy[lang]}
      onLanguageChange={setLang}
    />
  );
}

const styles = `
  .nfc-page {
    --red: #bf1f1a; --cream: #f0e6cc; --muted: #8a7256;
    position: relative; min-height: 100vh; min-height: 100svh; overflow: hidden;
    display: grid; place-items: center;
    padding: max(1.25rem, env(safe-area-inset-top)) 1.25rem max(1.25rem, env(safe-area-inset-bottom));
    background: radial-gradient(circle at 50% -10%, rgba(191,31,26,.19), transparent 38%), #0a0604;
    isolation: isolate;
  }
  .nfc-grid { position: absolute; inset: 0; z-index: -2; opacity: .22;
    background-image: linear-gradient(rgba(240,230,204,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,230,204,.05) 1px, transparent 1px);
    background-size: 44px 44px; mask-image: linear-gradient(to bottom, black, transparent 85%); }
  .nfc-ghost { position: absolute; right: -.08em; bottom: -.22em; z-index: -1;
    color: rgba(191,31,26,.07); font-family: var(--font-bebas), 'Bebas Neue', sans-serif;
    font-size: min(72vw, 42rem); line-height: .8; user-select: none; }
  .nfc-card { width: min(100%, 31rem); border: 1px solid rgba(191,31,26,.3);
    padding: clamp(1.25rem, 5vw, 2rem); background: rgba(10,6,4,.88);
    box-shadow: 0 1.5rem 6rem rgba(0,0,0,.42); backdrop-filter: blur(10px);
    animation: arrive 560ms cubic-bezier(.2,.8,.2,1) both; }
  .nfc-header { display: flex; align-items: center; gap: 1rem; margin-bottom: clamp(2rem, 8vh, 4rem); }
  .nfc-rule { height: 1px; flex: 1; background: rgba(191,31,26,.34); }
  .nfc-languages { display: flex; align-items: center; gap: .2rem; }
  .nfc-language { min-width: 2rem; min-height: 2rem; border: 0; padding: .35rem; background: transparent;
    color: var(--muted); font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-size: .72rem;
    letter-spacing: .11em; cursor: pointer; }
  .nfc-language[data-active='true'] { color: var(--cream); box-shadow: inset 0 -1px var(--red); }
  .nfc-copy { margin-bottom: 2rem; }
  .nfc-eyebrow { display: flex; align-items: center; gap: .6rem; margin-bottom: .85rem; color: var(--red);
    font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-size: .72rem; letter-spacing: .24em; text-transform: uppercase; }
  .nfc-eyebrow::before { content: ''; width: 1.4rem; height: 1px; background: currentColor; }
  h1 { max-width: 9ch; color: var(--cream); font-family: var(--font-bebas), 'Bebas Neue', sans-serif;
    font-size: clamp(3.35rem, 15vw, 5.25rem); font-weight: 400; letter-spacing: .015em; line-height: .86; text-wrap: balance; }
  .nfc-subtitle { max-width: 30rem; margin-top: 1.2rem; color: var(--muted); font-family: var(--font-lora), Lora, serif;
    font-size: .9rem; line-height: 1.65; }
  .nfc-actions { display: grid; gap: .75rem; }
  .nfc-link { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center;
    min-height: 4.75rem; border: 1px solid rgba(240,230,204,.18); padding: .75rem .85rem; overflow: hidden;
    color: var(--cream); text-decoration: none; background: rgba(240,230,204,.035);
    transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease; }
  .nfc-link::after { content: ''; position: absolute; inset: 0 auto 0 0; width: 3px; background: var(--red);
    transform: scaleY(0); transition: transform 180ms ease; }
  .nfc-link:hover, .nfc-link:focus-visible { border-color: rgba(191,31,26,.7);
    background: rgba(191,31,26,.08); transform: translateX(4px); outline: none; }
  .nfc-link:hover::after, .nfc-link:focus-visible::after { transform: scaleY(1); }
  .nfc-link-primary { border-color: var(--red); background: var(--red); color: #fff; }
  .nfc-link-primary:hover, .nfc-link-primary:focus-visible { border-color: #d32b24; background: #a71915; }
  .nfc-icon { display: grid; width: 2.9rem; height: 2.9rem; place-items: center; border: 1px solid rgba(240,230,204,.18); }
  .nfc-icon svg { width: 1.2rem; height: 1.2rem; stroke-width: 1.6; }
  .nfc-link-copy { display: grid; gap: .14rem; padding: 0 .85rem; }
  .nfc-link-copy strong { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-size: 1.08rem;
    font-weight: 400; letter-spacing: .1em; text-transform: uppercase; }
  .nfc-link-copy small { color: currentColor; font-family: var(--font-lora), Lora, serif; font-size: .65rem; font-style: italic; opacity: .58; }
  .nfc-arrow { width: 1.1rem; height: 1.1rem; color: currentColor; opacity: .65; }
  .nfc-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: .8rem; margin-top: 1.6rem;
    color: rgba(138,114,86,.72); font-family: var(--font-bebas), 'Bebas Neue', sans-serif; font-size: .58rem; letter-spacing: .16em; }
  .nfc-footer span:nth-child(2) { color: var(--red); font-size: 1.15rem; letter-spacing: 0; }
  .nfc-footer span:last-child { text-align: right; }
  @keyframes arrive { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 360px) { .nfc-page { padding-inline: .8rem; } .nfc-card { padding: 1rem; } .nfc-header { margin-bottom: 2rem; } h1 { font-size: 3.15rem; } }
  @media (prefers-reduced-motion: reduce) { .nfc-card { animation: none; } .nfc-link { transition: none; } }
`;
