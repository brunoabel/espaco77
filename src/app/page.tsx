"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Home() {
  const { dict } = useLanguage();

  const tickerText = dict.home.ticker.join(" • ") + " • " + dict.home.ticker.join(" • ");

  return (
    <main>
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0px 1.5rem",
          backgroundColor: "rgb(10, 6, 4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Decorative "77" */}
        <div
          style={{
            position: "absolute",
            right: "-5vw",
            bottom: "10vh",
            fontSize: "30vw",
            fontFamily: "var(--font-bebas)",
            color: "rgba(191, 31, 26, 0.03)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          77
        </div>

        <div className="max-w-[72rem] mx-auto w-full animate-in">
          <p
            style={{
              fontFamily: "var(--font-bebas)",
              color: "rgb(191, 31, 26)",
              fontSize: "0.85rem",
              letterSpacing: "0.3em",
              marginBottom: "2rem",
              textTransform: "uppercase",
            }}
          >
            {dict.home.tag}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(4rem, 15vw, 10rem)",
              lineHeight: 0.85,
              color: "rgb(240, 230, 204)",
              letterSpacing: "-0.01em",
              marginBottom: "3rem",
            }}
          >
            {dict.home.hero1}
            <br />
            <span style={{ color: "rgb(191, 31, 26)" }}>{dict.home.hero2}</span>
            <br />
            {dict.home.hero3}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.1rem",
              color: "rgb(138, 114, 86)",
              maxWidth: "30rem",
              lineHeight: 1.6,
              marginBottom: "4rem",
            }}
          >
            {dict.home.subtitle[0]}
            <span style={{ color: "rgb(240, 230, 204)", fontWeight: "bold" }}>
              {dict.home.subtitle[1]}
            </span>
            {dict.home.subtitle[2]}
            <br />
            {dict.home.quote[1]}
          </p>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link
              href="/menu"
              style={{
                backgroundColor: "rgb(191, 31, 26)",
                color: "rgb(255, 255, 255)",
                padding: "1.2rem 2.5rem",
                fontFamily: "var(--font-bebas)",
                fontSize: "1.1rem",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "0.3s",
              }}
            >
              {dict.home.btnMenu}
            </Link>
          </div>
        </div>

        {/* Ticker Row */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: 0,
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            opacity: 0.3,
          }}
        >
          <div
            style={{
              display: "inline-block",
              animation: "ticker 30s linear infinite",
              fontFamily: "var(--font-bebas)",
              fontSize: "1.5rem",
              color: "rgb(240, 230, 204)",
              letterSpacing: "0.2em",
            }}
          >
            {tickerText}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}} />
    </main>
  );
}

