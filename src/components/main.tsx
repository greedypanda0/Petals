"use client";

import React from "react";
import Navbar from "./ui/navbar";
import Topbar from "./ui/topbar";
import { AnimatePresence } from "framer-motion";
import AuthDialog from "./authDialog";

export default function Main({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) {
  return (
    <main className={`flex flex-col min-h-screen relative ${className ?? ""}`}>
      <Topbar />
      <div className="flex-1 overflow-hidden">
        {children || ""}
        <AuthDialog />
      </div>

        <Navbar />
    </main>
  );
}
