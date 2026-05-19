"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const { dict, lang, setLang } = useLanguage();
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "rgb(10, 6, 4)",
        borderBottom: "1px solid rgba(191, 31, 26, 0.22)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        height: "3.75rem",
      }}
    >
      {/* Brand Logo */}
      <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <div
          style={{
            background: "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 4px) rgb(191, 31, 26)",
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: "27px",
              color: "white",
              letterSpacing: "0.05em",
              lineHeight: 1,
              marginTop: "0.9px",
            }}
          >
            77
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav
        className="nav-center"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Link
          href="/historia"
          className="hover:text-[#bf1f1a] transition-colors"
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: pathname === "/historia" ? "#bf1f1a" : "rgb(240, 230, 204)",
            textDecoration: "none",
          }}
        >
          {dict.nav.history}
        </Link>
        <Link
          href="/menu"
          className="hover:text-[#bf1f1a] transition-colors"
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: pathname === "/menu" ? "#bf1f1a" : "rgb(240, 230, 204)",
            textDecoration: "none",
          }}
        >
          {dict.nav.menu}
        </Link>
        <Link
          href="/localizacao"
          className="hover:text-[#bf1f1a] transition-colors"
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: pathname === "/localizacao" ? "#bf1f1a" : "rgb(240, 230, 204)",
            textDecoration: "none",
          }}
        >
          {dict.nav.location}
        </Link>

        {/* Language Select */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
          style={{
            background: "transparent",
            color: "rgb(138, 114, 86)",
            borderWidth: "medium",
            borderStyle: "none",
            borderColor: "currentcolor",
            borderImage: "initial",
            fontFamily: "var(--font-lora)",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            outline: "none",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          <option value="pt" style={{ background: "rgb(10, 6, 4)", color: "#f0e6cc" }}>PT</option>
          <option value="en" style={{ background: "rgb(10, 6, 4)", color: "#f0e6cc" }}>EN</option>
          <option value="es" style={{ background: "rgb(10, 6, 4)", color: "#f0e6cc" }}>ES</option>
        </select>
      </nav>

      {/* Right placeholder to keep layout balanced */}
      <div style={{ width: "45px" }} className="nav-placeholder" />

      {/* Embedded CSS for bulletproof responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .nav-center { display: none !important; }
          .nav-placeholder { display: none !important; }
        }
      `}} />
    </header>
  );
}

