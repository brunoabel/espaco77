"use client";

import { useEffect } from "react";

const destinationUrl = "https://espaco77.pt/menu";

export default function RedirectPage() {
  useEffect(() => {
    window.location.replace(destinationUrl);
  }, []);

  return null;
}
