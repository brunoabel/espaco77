import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://espaco77.vercel.app"),
  title: "Espaço 77 — Porto",
  description: "A paragem obrigatória no Porto desde 1995.",
  openGraph: {
    title: "Espaço 77 — Porto",
    description: "A paragem obrigatória no Porto desde 1995.",
    url: "https://espaco77.vercel.app",
    siteName: "Espaço 77",
    images: [
      {
        url: "/assets/balde-de-minis.jpeg",
        width: 1200,
        height: 630,
        alt: "Espaço 77 — O convívio no Porto",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço 77 — Porto",
    description: "A paragem obrigatória no Porto desde 1995.",
    images: ["/assets/balde-de-minis.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-[#0a0604]">
        <LanguageProvider>
          <Navbar />
          <div className="pb-20 md:pb-0">
            {children}
          </div>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
