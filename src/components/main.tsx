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
    <main className={`relative flex flex-col w-full h-full ${className ?? ""}`}>
      <Topbar />
      <div className="w-full h-full overflow-hidden flex flex-col">
        {children || ""}
      </div>
      <AuthDialog />
      <Navbar />
    </main>
  );
}
