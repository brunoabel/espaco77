"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beer, BookOpen, Camera, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function BottomNav() {
  const { dict } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: "/menu", icon: Beer, label: dict.nav.menu },
    { href: "/historia", icon: BookOpen, label: dict.nav.history },
    { href: "/galeria", icon: Camera, label: dict.nav.gallery || "Galeria" },
    { href: "/localizacao", icon: MapPin, label: dict.nav.location },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "3.75rem",
        background: "rgb(10, 6, 4)",
        borderTop: "1px solid rgba(191, 31, 26, 0.22)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 50,
        boxSizing: "border-box",
        padding: "0 0.5rem",
      }}
      className="bottom-nav"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex flex-col items-center justify-center px-2 hover:bg-white/5 group transition-colors"
            style={{ textDecoration: "none" }}
          >
            <Icon
              style={{
                width: "20px",
                height: "20px",
                transition: "color 0.2s, filter 0.2s",
              }}
              className={
                isActive
                  ? "text-[#bf1f1a] drop-shadow-[0_0_15px_rgba(191,31,26,0.5)]"
                  : "text-[#8a7256] group-hover:text-[#bf1f1a]"
              }
            />
            <span
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "2px",
                transition: "color 0.2s",
              }}
              className={isActive ? "text-[#bf1f1a]" : "text-[#8a7256] group-hover:text-[#bf1f1a]"}
            >
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Embedded CSS for bulletproof responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 641px) {
          .bottom-nav { display: none !important; }
        }
      `}} />
    </nav>
  );
}
