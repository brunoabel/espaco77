import type { Language } from "./dictionaries";
import type { NfcLinkId } from "@/lib/nfc";

export interface NfcCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  tapHint: string;
  languageLabel: string;
  instagramTitle: string;
  instagramDescription: string;
  openInstagram: string;
  linkLabels: Record<NfcLinkId, string>;
}

export const nfcCopy: Record<Language, NfcCopy> = {
  pt: {
    eyebrow: "Porto · Desde 1995",
    title: "A NOITE COMEÇA AQUI.",
    subtitle: "Escolhe o teu próximo passo.",
    tapHint: "Toca para abrir",
    languageLabel: "Escolher idioma",
    instagramTitle: "ABRIR NO INSTAGRAM",
    instagramDescription: "Toca no botão abaixo. Se o aplicativo estiver instalado, o teu telemóvel tentará abri-lo.",
    openInstagram: "Abrir no Instagram",
    linkLabels: { menu: "Ver o menu", instagram: "Instagram", location: "Como chegar" },
  },
  en: {
    eyebrow: "Porto · Since 1995",
    title: "THE NIGHT STARTS HERE.",
    subtitle: "Choose where you want to go next.",
    tapHint: "Tap to open",
    languageLabel: "Choose language",
    instagramTitle: "OPEN INSTAGRAM",
    instagramDescription: "Tap the button below. If the app is installed, your phone will try to open it.",
    openInstagram: "Open Instagram",
    linkLabels: { menu: "View the menu", instagram: "Instagram", location: "Get directions" },
  },
  es: {
    eyebrow: "Oporto · Desde 1995",
    title: "LA NOCHE EMPIEZA AQUÍ.",
    subtitle: "Elige tu próximo paso.",
    tapHint: "Toca para abrir",
    languageLabel: "Elegir idioma",
    instagramTitle: "ABRIR INSTAGRAM",
    instagramDescription: "Toca el botón. Si la aplicación está instalada, tu móvil intentará abrirla.",
    openInstagram: "Abrir Instagram",
    linkLabels: { menu: "Ver el menú", instagram: "Instagram", location: "Cómo llegar" },
  },
};
