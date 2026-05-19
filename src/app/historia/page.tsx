"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

export default function Historia() {
  const { dict } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "rgb(10, 6, 4)", width: "100%", overflowX: "hidden" }}>
      <div style={{ maxWidth: "72rem", margin: "0px auto", padding: "3rem 1.5rem 6rem" }}>
        
        {/* ── HEADER ── */}
        <motion.header 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ paddingBottom: "4rem", marginBottom: "4rem", borderBottom: "1px solid rgba(191, 31, 26, 0.2)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "rgb(191, 31, 26)" }} />
            <span style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "0.85rem",
              letterSpacing: "0.3em",
              color: "rgb(191, 31, 26)",
              textTransform: "uppercase"
            }}>
              {dict.history.tag}
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(4.5rem, 14vw, 9rem)",
            lineHeight: 0.85,
            color: "rgb(240, 230, 204)",
            letterSpacing: "-0.02em",
            maxWidth: "100%"
          }}>
            {dict.history.title}
          </h1>
        </motion.header>

        {/* ── BENTO STATS ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            border: "1px solid rgba(191, 31, 26, 0.2)",
            marginBottom: "6rem",
            position: "relative"
          }}
        >
          {[
            { num: dict.history.stat1, label: dict.history.stat1Lbl, borderRight: true },
            { num: dict.history.stat2, label: dict.history.stat2Lbl, borderRight: true },
            { num: dict.history.stat3, label: dict.history.stat3Lbl, borderRight: false },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants} 
              className="group"
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                borderRight: stat.borderRight ? "1px solid rgba(191, 31, 26, 0.2)" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative"
              }}
            >
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-[rgba(191,31,26,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div 
                className="group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(4rem, 8vw, 6rem)",
                  color: "rgb(191, 31, 26)",
                  marginBottom: "0.5rem",
                  lineHeight: 1
                }}
              >
                {stat.num}
              </div>
              <div style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                color: "rgb(138, 114, 86)",
                textTransform: "uppercase"
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CINEMATIC MEDIA ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="group relative w-full overflow-hidden"
          style={{
            aspectRatio: "16/9",
            marginBottom: "8rem",
            border: "1px solid rgba(191, 31, 26, 0.2)"
          }}
        >
          <Image 
            src="/assets/user-photo-1.jpg" 
            alt="Espaço 77 Vintage" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(10,6,4)] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1rem, 3vw, 2rem)",
              letterSpacing: "0.3em",
              color: "rgb(240, 230, 204)",
              opacity: 0.9
            }}>
              CEDOFEITA, PORTO · 1995
            </p>
          </div>
        </motion.div>

        {/* ── EDITORIAL CONTENT GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
          gap: "5rem 4rem"
        }}>
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            <p style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              fontStyle: "italic",
              lineHeight: 1.7,
              color: "rgb(138, 114, 86)"
            }}>
              {dict.history.p1a}
              <span style={{ color: "rgb(240, 230, 204)", fontWeight: "bold", fontStyle: "normal", margin: "0 0.3rem" }}>
                {dict.history.p1b}
              </span>
              {dict.history.p1c}
            </p>
            <p style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(240, 230, 204, 0.7)"
            }}>
              {dict.history.p2a}
              <span style={{ color: "rgb(240, 230, 204)", margin: "0 0.3rem" }}>{dict.history.p2b}</span>
              {dict.history.p2c}
              <span style={{ color: "rgb(240, 230, 204)", margin: "0 0.3rem" }}>{dict.history.p2d}</span>
              {dict.history.p2e}
            </p>
            <p style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(240, 230, 204, 0.7)"
            }}>
              {dict.history.p3}
            </p>
          </motion.div>

          {/* Right Column (Quote & More Text) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
          >
            <div style={{
              borderLeft: "4px solid rgb(191, 31, 26)",
              paddingLeft: "2rem",
              paddingTop: "1rem",
              paddingBottom: "1rem"
            }}>
              <h2 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                fontStyle: "italic",
                marginBottom: "1rem"
              }}>
                <span style={{ display: "block", color: "rgb(240, 230, 204)" }}>{dict.history.q1}</span>
                <span style={{ display: "block", color: "rgb(191, 31, 26)" }}>{dict.history.q2}</span>
                <span style={{ display: "block", color: "rgb(240, 230, 204)" }}>{dict.history.q3}</span>
              </h2>
            </div>
            <p style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(240, 230, 204, 0.7)"
            }}>
              {dict.history.p4a}
              <span style={{ color: "rgb(240, 230, 204)", margin: "0 0.3rem" }}>{dict.history.p4b}</span>
              {dict.history.p4c}
            </p>
            <p style={{
              fontFamily: "var(--font-lora)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(240, 230, 204, 0.7)"
            }}>
              {dict.history.p5}
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
