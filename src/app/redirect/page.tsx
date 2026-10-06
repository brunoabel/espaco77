import type { Metadata } from "next";
import { redirect } from "next/navigation";

import NfcExperience from "@/components/nfc/NfcExperience";
import { nfcConfig } from "@/config/nfc";
import { getNfcAction } from "@/lib/nfc";

export const metadata: Metadata = {
  title: "Ligações NFC | Espaço 77",
  robots: { index: false, follow: false },
};

export default function RedirectPage() {
  const action = getNfcAction(nfcConfig);

  if (action.type === "redirect") {
    redirect(action.href);
  }

  if (action.type === "instagram") {
    return (
      <NfcExperience
        variant="instagram"
        instagramHref={action.href}
        links={nfcConfig.links}
      />
    );
  }

  return <NfcExperience variant="links" links={nfcConfig.links} />;
}
