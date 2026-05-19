"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface MenuItem {
  name: string;
  price: string;
  priceAlt?: string;
  isPopular?: boolean;
  sub?: string;
  isNew?: boolean;
}

interface Category {
  id: string;
  title: string;
  items: MenuItem[];
  labels?: { price1: string; price2: string };
}

export default function MenuPage() {
  const { dict, lang } = useLanguage();
  const [tab, setTab] = useState<"drinks" | "food">("drinks");

  const drinksData = (dict.menu.drinks as Category[]) || [];
  const foodData = (dict.menu.food as Category[]) || [];

  // Parse item into displayName and subtext dynamically
  const parseItem = (item: MenuItem, catId: string) => {
    let displayName = item.name;
    let subText = item.sub || "";
    let isNew = item.isNew || false;
    let isTop = false;
    let isMix = false;

    // Specific logic for beer volumes and baldes
    if (catId === "cerveja_garrafa") {
      if (item.name === "Mini 20cl") {
        displayName = "Mini";
        subText = "0.20L";
      } else if (item.name === "Mini Stout 20cl") {
        displayName = "Mini Stout";
        subText = "0.20L";
      } else if (item.name.includes("33cl")) {
        displayName = item.name.replace(" 33cl", "");
        subText = "33cl";
      } else if (item.name.includes("Pague 10 e leve 11")) {
        displayName = "Balde de Minis";
        subText = "11 Minis";
        isTop = true;
      }
    } else if (catId === "cerveja_pressao") {
      if (item.name.includes("cl")) {
        const match = item.name.match(/(.*?)\s+(\d+cl)/);
        if (match) {
          displayName = match[1];
          subText = match[2];
        }
      }
    } else if (catId === "somersby") {
      if (item.name === "Somersby 30cl") {
        displayName = "Somersby";
        subText = "30cl";
      } else if (item.name === "Somersby 50cl") {
        displayName = "Somersby";
        subText = "50cl";
      } else if (item.name.includes("Garrafa 33cl")) {
        displayName = "Somersby Garrafa";
        subText = item.name.includes("Blackberry") ? "33cl (Blackberry ou Maçã)" : "33cl";
      } else if (item.name.includes("Absinto 30cl")) {
        displayName = "Somersby com Absinto";
        subText = "30cl";
      } else if (item.name.includes("Absinto 50cl")) {
        displayName = "Somersby com Absinto";
        subText = "50cl";
      }
    } else if (catId === "drinks") {
      if (item.name === "Shot 77") {
        isMix = true;
      }
      if (item.name.includes("50cl")) {
        const match = item.name.match(/(.*?)\s+(50cl.*)/);
        if (match) {
          displayName = match[1];
          subText = match[2];
        }
      }
    }

    // Dynamic parentheses extraction for food / general items
    if (displayName.includes("(") && displayName.includes(")") && !isTop) {
      const match = displayName.match(/(.*?)\s*\((.*?)\)/);
      if (match) {
        displayName = match[1].trim();
        subText = match[2].trim();
      }
    }

    return { displayName, subText, isNew, isTop, isMix };
  };

  // Build the correct drinks list including Spritz and separate Sangrias
  const getDrinksList = (): Category[] => {
    const list: Category[] = [];

    // 1. SANGRIAS
    const originalSangria = drinksData.find(c => c.id === "sangrias");
    if (originalSangria) {
      list.push({
        id: "sangrias",
        title: lang === "pt" ? "SANGRIAS" : lang === "es" ? "SANGRÍAS" : "SANGRIAS",
        items: [
          { name: lang === "pt" ? "Sangria Tinta (Copo 0.30L)" : lang === "es" ? "Sangría Tinta (Copa 0.30L)" : "Red Sangria (Glass 0.30L)", price: "3,00€" },
          { name: lang === "pt" ? "Sangria Tinta (Copo 0.50L)" : lang === "es" ? "Sangría Tinta (Copa 0.50L)" : "Red Sangria (Glass 0.50L)", price: "5,00€" },
          { name: lang === "pt" ? "Sangria Branca (Copo 0.30L)" : lang === "es" ? "Sangría Blanca (Copa 0.30L)" : "White Sangria (Glass 0.30L)", price: "3,00€" },
          { name: lang === "pt" ? "Sangria Branca (Copo 0.50L)" : lang === "es" ? "Sangría Blanca (Copa 0.50L)" : "White Sangria (Glass 0.50L)", price: "5,00€" },
          { name: lang === "pt" ? "Sangria Jarro (1L) Tinta/Branca" : lang === "es" ? "Sangría Jarra (1L) Tinta/Blanca" : "Sangria Pitcher (1L) Red/White", price: "13,50€" },
          { name: lang === "pt" ? "Sangria Frutos Vermelhos (Jarro 1L)" : lang === "es" ? "Sangría Frutos Rojos (Jarra 1L)" : "Red Berries Sangria (Pitcher 1L)", price: "14,75€" },
          { name: lang === "pt" ? "Sangria Espumante (Jarro 1L)" : lang === "es" ? "Sangría Cava (Jarra 1L)" : "Sparkling Wine Sangria (Pitcher 1L)", price: "15,50€" }
        ]
      });
    }

    // 2. SPRITZ
    list.push({
      id: "spritz",
      title: "SPRITZ",
      items: [
        { name: "Aperol Spritz", price: "6,50€", isNew: true },
        { name: "Campari Spritz", price: "6,50€", isNew: true },
        { name: "Limoncello Spritz", price: "6,50€", isNew: true }
      ]
    });

    // 3. CERVEJAS
    const cervejaGarrafa = drinksData.find(c => c.id === "cerveja_garrafa");
    if (cervejaGarrafa) list.push(cervejaGarrafa);

    const cervejaPressao = drinksData.find(c => c.id === "cerveja_pressao");
    if (cervejaPressao) list.push(cervejaPressao);

    // 4. VINHOS
    const vinhos = drinksData.find(c => c.id === "vinhos");
    if (vinhos) list.push(vinhos);

    // 5. DRINKS (BEBIDAS)
    const drinks = drinksData.find(c => c.id === "drinks");
    if (drinks) list.push(drinks);

    // 6. SOMERSBY
    const somersby = drinksData.find(c => c.id === "somersby");
    if (somersby) list.push(somersby);

    // 7. ÁGUAS
    const aguas = drinksData.find(c => c.id === "aguas");
    if (aguas) list.push(aguas);

    // 8. SHOTS
    const shots = drinksData.find(c => c.id === "shots");
    if (shots) list.push(shots);

    return list;
  };

  const current = tab === "drinks" ? getDrinksList() : foodData;

  const getTag = () => {
    if (tab === "drinks") {
      if (lang === "pt") return "O que há para beber";
      if (lang === "es") return "Qué hay para beber";
      return "What to drink";
    } else {
      if (lang === "pt") return "O que há para comer";
      if (lang === "es") return "Qué hay para comer";
      return "What to eat";
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "rgb(10, 6, 4)",
      width: "100%",
    }}>
      <div style={{
        maxWidth: "72rem",
        margin: "0px auto",
        padding: "3rem 1.5rem 6rem",
      }}>
        {/* ── HEADER ── */}
      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: "24px", height: "1px", backgroundColor: "rgb(191, 31, 26)" }}></div>
          <span style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            color: "rgb(191, 31, 26)",
            textTransform: "uppercase"
          }}>
            {getTag()}
          </span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(3.5rem, 12vw, 6rem)",
          lineHeight: 0.9,
          color: "rgb(240, 230, 204)",
          letterSpacing: "0.02em"
        }}>
          {dict.menu.title}
        </h1>
      </header>

      {/* ── TABS ── */}
      <nav style={{
        display: "flex",
        borderBottom: "1px solid rgba(191, 31, 26, 0.2)",
        marginBottom: "3rem"
      }}>
        <button
          onClick={() => setTab("drinks")}
          style={{
            flex: "1 1 0%",
            padding: "1.25rem 0px",
            fontFamily: "var(--font-bebas)",
            fontSize: "1.25rem",
            letterSpacing: "0.1em",
            color: tab === "drinks" ? "rgb(191, 31, 26)" : "rgb(138, 114, 86)",
            border: "none",
            transition: "0.2s",
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
          {dict.menu.tabs.drinks}
        </button>
        <button
          onClick={() => setTab("food")}
          style={{
            flex: "1 1 0%",
            padding: "1.25rem 0px",
            fontFamily: "var(--font-bebas)",
            fontSize: "1.25rem",
            letterSpacing: "0.1em",
            color: tab === "food" ? "rgb(191, 31, 26)" : "rgb(138, 114, 86)",
            border: "none",
            transition: "0.2s",
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
          {dict.menu.tabs.food}
        </button>
      </nav>

      {/* ── CATEGORY LISTS WITH TRANSITION ── */}
      <div
        key={tab}
        className="animate-in"
      >
          {current.map((cat) => (
            <section key={cat.id} style={{ marginBottom: "3.5rem" }}>
              <h2 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "1.5rem",
                color: "rgb(191, 31, 26)",
                letterSpacing: "0.1em",
                marginBottom: "1.5rem",
                marginTop: "2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "rgb(191, 31, 26)" }}></span>
                {cat.title}
              </h2>

              {cat.labels && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.8rem", marginBottom: "0.5rem", paddingRight: "0.5rem" }}>
                  {[cat.labels.price1, cat.labels.price2].map((l) => (
                    <span key={l} style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      color: "rgb(138, 114, 86)",
                      textTransform: "uppercase",
                      width: "60px",
                      textAlign: "right"
                    }}>{l}</span>
                  ))}
                </div>
              )}

              <div data-grid="menu" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: "1.5rem 3rem"
              }}>
                {cat.items.map((item, idx) => {
                  const parsed = parseItem(item, cat.id);
                  return (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", padding: "0.75rem 0px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", width: "100%" }}>
                        <span style={{
                          fontFamily: "var(--font-lora)",
                          fontSize: "1.05rem",
                          color: "rgb(240, 230, 204)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          whiteSpace: "nowrap"
                        }}>
                          {parsed.displayName}
                          {parsed.isNew && (
                            <span style={{
                              fontSize: "0.6rem",
                              padding: "0.1rem 0.4rem",
                              borderRadius: "2px",
                              backgroundColor: "rgb(191, 31, 26)",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontFamily: "var(--font-bebas)",
                              marginLeft: "0.25rem"
                            }}>
                              {lang === "pt" ? "Novo" : lang === "es" ? "Nuevo" : "New"}
                            </span>
                          )}
                          {parsed.isTop && (
                            <span style={{
                              fontSize: "0.6rem",
                              padding: "0.1rem 0.4rem",
                              borderRadius: "2px",
                              backgroundColor: "rgb(212, 160, 23)",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontFamily: "var(--font-bebas)",
                              marginLeft: "0.25rem"
                            }}>
                              TOP
                            </span>
                          )}
                          {parsed.isMix && (
                            <span style={{
                              fontSize: "0.6rem",
                              padding: "0.1rem 0.4rem",
                              borderRadius: "2px",
                              backgroundColor: "rgb(191, 31, 26)",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontFamily: "var(--font-bebas)",
                              marginLeft: "0.25rem"
                            }}>
                              MIX
                            </span>
                          )}
                          {item.isPopular && (
                            <span style={{
                              fontSize: "0.6rem",
                              padding: "0.1rem 0.4rem",
                              borderRadius: "2px",
                              backgroundColor: "rgb(191, 31, 26)",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontFamily: "var(--font-bebas)",
                              marginLeft: "0.25rem"
                            }}>
                              POPULAR
                            </span>
                          )}
                        </span>
                        
                        <div style={{
                          flex: "1 1 0%",
                          borderBottom: "1px dotted rgba(240, 230, 204, 0.2)",
                          margin: "0px 0.5rem",
                          height: "1px",
                          position: "relative",
                          top: "-4px"
                        }}></div>

                        <div style={{ display: "flex", gap: "1.8rem", alignItems: "baseline" }}>
                          {item.price && (
                            <span style={{
                              fontFamily: "var(--font-bebas)",
                              fontSize: "1.2rem",
                              color: "rgb(191, 31, 26)",
                              whiteSpace: "nowrap",
                              width: cat.labels ? "60px" : "auto",
                              textAlign: cat.labels ? "right" : "left"
                            }}>
                              {item.price}
                            </span>
                          )}
                          {item.priceAlt && (
                            <span style={{
                              fontFamily: "var(--font-bebas)",
                              fontSize: "1.2rem",
                              color: "rgb(191, 31, 26)",
                              whiteSpace: "nowrap",
                              width: "60px",
                              textAlign: "right"
                            }}>
                              {item.priceAlt}
                            </span>
                          )}
                        </div>
                      </div>
                      {parsed.subText && (
                        <span style={{
                          fontFamily: "var(--font-lora)",
                          fontStyle: "italic",
                          fontSize: "0.85rem",
                          color: "rgb(138, 114, 86)",
                          marginTop: "-2px"
                        }}>
                          {parsed.subText}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        marginTop: "5rem",
        textAlign: "center",
        fontFamily: "var(--font-lora)",
        fontStyle: "italic",
        fontSize: "0.8rem",
        color: "rgb(138, 114, 86)",
        opacity: 0.7
      }}>
        <p>{dict.menu.note}</p>
        <p style={{ marginTop: "0.5rem" }}>Porto · Travessa de Cedofeita</p>
      </footer>

      {/* ── CSS KEYFRAMES ANIMATION ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
      </div>
    </main>
  );
}