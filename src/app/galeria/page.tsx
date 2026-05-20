"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GalleryPhoto {
  id: number;
  src: string;
  productName: string;
  price: string;
  description: string;
  category: string;
}

export default function Galeria() {
  const { dict } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Apenas as fotos "estéticas" e reais enviadas
  const photos: GalleryPhoto[] = [
    {
      id: 1,
      src: "/assets/gin-sharish.jpg",
      productName: "Gin Sharish",
      price: "8,50 €",
      description: "Um gin premium português com notas de maçã bravo de esmolfe, servido com a perfeição que o 77 exige.",
      category: "Cocktails"
    },
    {
      id: 2,
      src: "/assets/drink-redbull.jpg",
      productName: "Red Bull & Gin",
      price: "7,50 €",
      description: "A energia do Red Bull encontra a sofisticação do Gin. Uma combinação icónica para as noites de Cedofeita.",
      category: "Cocktails"
    },
    {
      id: 3,
      src: "/assets/drink-1927.jpg",
      productName: "Super Bock 1927",
      price: "3,50 €",
      description: "A mestria cervejeira numa seleção especial. Malte e lúpulo em harmonia perfeita.",
      category: "Cerveja"
    },
    {
      id: 5,
      src: "/assets/aperol-spritz.jpg",
      productName: "Aperol Spritz",
      price: "6,50 €",
      description: "Refrescante, cítrico e perfeito para começar a noite. O clássico italiano com o toque do 77.",
      category: "Cocktails"
    },
    {
      id: 6,
      src: "/assets/balde-de-minis.jpeg",
      productName: "Balde de Minis",
      price: "9,50 €",
      description: "11 unidades. O símbolo máximo do convívio no Espaço 77. Geladas, sempre.",
      category: "Cerveja"
    }
  ];

  const S = {
    page: {
      maxWidth: "90rem",
      margin: "0 auto",
      padding: "4rem 1.5rem",
      backgroundColor: "#0a0604",
      minHeight: "100vh",
    } as React.CSSProperties,

    header: {
      textAlign: "center" as const,
      marginBottom: "5rem",
    } as React.CSSProperties,

    tag: {
      fontFamily: "var(--font-bebas)",
      color: "#bf1f1a",
      fontSize: "0.8rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      marginBottom: "1rem",
    } as React.CSSProperties,

    h1: {
      fontFamily: "var(--font-bebas)",
      fontSize: "clamp(3rem, 10vw, 6rem)",
      color: "#f0e6cc",
      lineHeight: 1,
      marginBottom: "1.5rem",
    } as React.CSSProperties,

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem",
    } as React.CSSProperties,

    card: {
      position: "relative" as const,
      aspectRatio: "3/4",
      overflow: "hidden",
      cursor: "pointer",
      backgroundColor: "#111",
    } as React.CSSProperties,

    modal: {
      position: "fixed" as const,
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      backgroundColor: "rgba(10, 6, 4, 0.95)",
      backdropFilter: "blur(10px)",
    } as React.CSSProperties,

    modalContent: {
      maxWidth: "60rem",
      width: "100%",
      backgroundColor: "#111",
      display: "flex",
      flexDirection: "row",
      gap: "0",
      overflow: "hidden",
      border: "1px solid rgba(191, 31, 26, 0.2)",
    } as React.CSSProperties,

    modalImage: {
      flex: 1,
      position: "relative" as const,
      minHeight: "40rem",
    } as React.CSSProperties,

    modalInfo: {
      width: "25rem",
      padding: "3rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#0a0604",
    } as React.CSSProperties,
  };

  return (
    <div style={S.page}>
      <header style={S.header}>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={S.tag}
        >
          {dict.gallery.tag}
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={S.h1}
        >
          {dict.gallery.title}
        </motion.h1>
      </header>

      <div style={S.grid}>
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedPhoto(photo)}
            style={S.card}
          >
            <Image
              src={photo.src}
              alt={photo.productName}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-red-600 font-bebas text-xs tracking-widest mb-1">{photo.category}</span>
              <h3 className="text-cream font-bebas text-2xl tracking-wide">{photo.productName}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={S.modal}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              style={S.modalContent}
              onClick={(e) => e.stopPropagation()}
              className="flex-col md:flex-row"
            >
              <div style={S.modalImage} className="w-full h-[300px] md:h-auto">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.productName}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={S.modalInfo} className="w-full">
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-6 right-6 text-cream/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <span className="text-red-600 font-bebas text-sm tracking-widest mb-2">
                  {selectedPhoto.category}
                </span >
                <h2 className="text-cream font-bebas text-5xl mb-4 leading-none">
                  {selectedPhoto.productName}
                </h2>
                <p className="text-red-600 font-bebas text-3xl mb-6">
                  {selectedPhoto.price}
                </p>
                <p className="text-muted font-lora italic text-sm leading-relaxed mb-8">
                  {selectedPhoto.description}
                </p>

                <Link 
                  href="/menu" 
                  className="flex items-center justify-between w-full border border-red-600/30 p-4 text-cream font-bebas hover:bg-red-600 hover:text-white transition-all group"
                >
                  <span>VER NO MENU</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .font-bebas { font-family: var(--font-bebas); }
        .font-lora { font-family: var(--font-lora); }
        .text-cream { color: #f0e6cc; }
        .text-muted { color: #8a7256; }
      `}</style>
    </div>
  );
}
