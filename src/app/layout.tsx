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
      <head>
        {/* Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{ __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2015736999337515');
fbq('track', 'PageView');
` }} />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2015736999337515&ev=PageView&noscript=1" />` }} />
        {/* End Meta Pixel Code */}
      </head>
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
