"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OndeParamos() {
  const { dict } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0604] pt-24 pb-20 md:pb-0">
      <div style={{ maxWidth: "72rem", margin: "0px auto", padding: "3rem 1.5rem 5rem" }}>
        
        {/* ── HEADER ── */}
        <header style={{
          borderBottom: "1px solid rgba(191, 31, 26, 0.22)",
          paddingBottom: "1.5rem",
          marginBottom: "2.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <div style={{ width: "22px", height: "1px", background: "rgb(191, 31, 26)", flexShrink: 0 }}></div>
            <span style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: "0.63rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgb(191, 31, 26)"
            }}>
              {dict.location.tag}
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "3.5rem",
            letterSpacing: "0.04em",
            color: "rgb(240, 230, 204)",
            lineHeight: 1
          }}>
            {dict.location.title}
          </h1>
        </header>

        {/* ── GRID CONTENT ── */}
        <div className="onde-grid" style={{ border: "1px solid rgba(191, 31, 26, 0.22)" }}>
          
          {/* ── LEFT COLUMN: INFO ── */}
          <div className="left-col" style={{ display: "flex", flexDirection: "column" }}>
            
            {/* MORADA */}
            <div className="info-block" style={{ padding: "2rem", borderBottom: "1px solid rgba(191, 31, 26, 0.22)" }}>
              <div style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgb(191, 31, 26)",
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}>
                {dict.location.lbl1}
              </div>
              <div style={{
                fontFamily: "var(--font-lora), 'Lora', serif",
                fontSize: "0.87rem",
                color: "rgb(240, 230, 204)",
                lineHeight: 1.7
              }}>
                {dict.location.val1a}<br />
                <span style={{
                  fontFamily: "var(--font-lora), 'Lora', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "rgb(138, 114, 86)"
                }}>
                  {dict.location.val1b}
                </span>
              </div>
            </div>

            {/* HORÁRIO */}
            <div className="info-block" style={{ padding: "2rem", borderBottom: "1px solid rgba(191, 31, 26, 0.22)" }}>
              <div style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgb(191, 31, 26)",
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}>
                {dict.location.lbl2}
              </div>
              <div style={{
                fontFamily: "var(--font-lora), 'Lora', serif",
                fontSize: "0.87rem",
                color: "rgb(240, 230, 204)",
                lineHeight: 1.7
              }}>
                <div>
                  {dict.location.val2a}
                  <span style={{
                    fontFamily: "var(--font-lora), 'Lora', serif",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    color: "rgb(138, 114, 86)",
                    display: "inline",
                    marginLeft: "0.4rem"
                  }}>
                    {dict.location.val2b}
                  </span>
                </div>
                <div>
                  {dict.location.val2c}
                  <span style={{
                    fontFamily: "var(--font-lora), 'Lora', serif",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    color: "rgb(138, 114, 86)",
                    display: "inline",
                    marginLeft: "0.4rem"
                  }}>
                    {dict.location.val2d}
                  </span>
                </div>
              </div>
            </div>

            {/* CONTACTO */}
            <div className="info-block" style={{ padding: "2rem", borderBottom: "1px solid rgba(191, 31, 26, 0.22)" }}>
              <div style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgb(191, 31, 26)",
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}>
                {dict.location.lbl3}
              </div>
              <div style={{
                fontFamily: "var(--font-lora), 'Lora', serif",
                fontSize: "0.87rem",
                color: "rgb(240, 230, 204)",
                lineHeight: 1.7
              }}>
                <a 
                  href="https://instagram.com/espaco.77" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: "rgb(240, 230, 204)",
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "rgb(191, 31, 26)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgb(240, 230, 204)"}
                >
                  @espaco.77
                </a><br />
                <span style={{
                  fontFamily: "var(--font-lora), 'Lora', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "rgb(138, 114, 86)"
                }}>
                  Instagram
                </span>
              </div>
            </div>

            {/* COMO CHEGAR */}
            <div className="info-block" style={{ padding: "2rem", borderBottom: "none" }}>
              <div style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgb(191, 31, 26)",
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}>
                {dict.location.lbl4}
              </div>
              <div style={{
                fontFamily: "var(--font-lora), 'Lora', serif",
                fontSize: "0.87rem",
                color: "rgb(240, 230, 204)",
                lineHeight: 1.7
              }}>
                <span style={{
                  fontFamily: "var(--font-lora), 'Lora', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "rgb(138, 114, 86)"
                }}>
                  {dict.location.val4a}
                </span><br />
                <span style={{
                  fontFamily: "var(--font-lora), 'Lora', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "rgb(138, 114, 86)"
                }}>
                  {dict.location.val4b}
                </span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: MAP ── */}
          <div className="right-col" style={{ padding: "2rem", display: "flex", flexDirection: "column" }}>
            <div style={{
              flexGrow: 1,
              background: "linear-gradient(rgba(191, 31, 26, 0.08) 1px, transparent 1px) 0% 0% / 26px 26px, linear-gradient(90deg, rgba(191, 31, 26, 0.08) 1px, transparent 1px) rgba(191, 31, 26, 0.05)",
              border: "1px solid rgba(191, 31, 26, 0.22)",
              minHeight: "400px",
              width: "100%",
              position: "relative",
              overflow: "hidden"
            }}>
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Travessa%20de%20Cedofeita%2022,%20Porto+(Espa%C3%A7o%2077)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Espaço 77 - Google Maps"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "0px",
                  filter: "invert(90%) hue-rotate(180deg) grayscale(30%) contrast(110%)"
                }}
              />
            </div>
            <div style={{
              fontFamily: "var(--font-lora), 'Lora', serif",
              fontStyle: "italic",
              fontSize: "0.68rem",
              color: "rgb(138, 114, 86)",
              marginTop: "0.8rem",
              textAlign: "right"
            }}>
              {dict.location.mapLegend}
            </div>
          </div>

        </div>

        {/* ── STYLES FOR RESPONSIBILITY ── */}
        <style dangerouslySetInnerHTML={{ __html: `
          .onde-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .left-col {
            border-right: 1px solid rgba(191,31,26,0.22);
          }
          
          @media (max-width: 768px) {
            .onde-grid {
              grid-template-columns: 1fr;
            }
            .left-col {
              border-right: none;
              border-bottom: 1px solid rgba(191,31,26,0.22);
            }
            .info-block {
              padding: 1.5rem !important;
            }
            .right-col {
              padding: 1.5rem !important;
            }
          }
        `}} />

      </div>
    </main>
  );
}
