"use client";

import { motion } from "framer-motion";
import { Flower2 } from "lucide-react"; 

export default function Topbar() {
  return (
    <motion.div
      key="topbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-12 w-full flex items-center gap-2 px-4"
    >
      <Flower2 className="h-5 w-5" />
      <h1 className="text-sm font-semibold tracking-wide">Petals</h1>
    </motion.div>
  );
}
