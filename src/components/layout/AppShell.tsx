"use client";

import { usePathname } from "next/navigation";

import BottomNav from "./BottomNav";
import Navbar from "./Navbar";

export function isStandalonePath(pathname: string) {
  return pathname === "/redirect" || pathname.startsWith("/redirect/");
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isStandalonePath(pathname)) {
    return children;
  }

  return (
    <>
      <Navbar />
      <div className="pb-20 md:pb-0">{children}</div>
      <BottomNav />
    </>
  );
}
