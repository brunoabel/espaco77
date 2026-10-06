"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, Language, Dictionary } from "./dictionaries";
import Logo from "@/components/ui/Logo";

interface LanguageContextType {
  lang: Language;
  dict: Dictionary;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function applyDocumentLanguage(
  language: Language,
  root: { lang: string },
) {
  root.lang = language;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("pt");
  const [hasChosen, setHasChosen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    applyDocumentLanguage(lang, document.documentElement);
  }, [lang]);

  useEffect(() => {
    const stored = localStorage.getItem("espaco77_lang") as Language;
    if (stored && dictionaries[stored]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
      setHasChosen(true);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setHasChosen(true);
    localStorage.setItem("espaco77_lang", newLang);
  };

  // We only show the UI after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#0a0604" }} />
    );
  }

  if (!hasChosen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0604",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Logo size={1.2} className="mb-12" />
        
        <h2 
          style={{ 
            fontFamily: "var(--font-title)", 
            color: "#f0e6cc", 
            fontSize: "1.5rem", 
            marginBottom: "2rem",
            letterSpacing: "0.05em",
            textAlign: "center"
          }}
        >
          CHOOSE YOUR EXPERIENCE
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "300px" }}>
          <button 
            onClick={() => setLang("en")}
            className="btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            English
          </button>
          <button 
            onClick={() => setLang("pt")}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Português
          </button>
          <button 
            onClick={() => setLang("es")}
            className="btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Español
          </button>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, dict: dictionaries[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
