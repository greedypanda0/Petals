"use client";

import { House, Search, MessagesSquare } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const bars = [
  { name: "Home", icon: House, path: "/" },
  { name: "Search", icon: Search, path: "/search" },
  { name: "Chats", icon: MessagesSquare, path: "/chats" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.div
      key="navbar"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className="fixed bottom-0 left-0 w-full h-16 flex items-center justify-around z-50"
    >
      {bars.map((item, idx) => {
        const isActive =
          pathname === item.path || pathname.startsWith(item.path + "/");

        const Icon = item.icon;

        return (
          <motion.div
            key={item.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.05 * idx,
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full transition-colors duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-muted text-sidebar-foreground"
              )}
              onClick={() => router.push(item.path)}
            >
              <Icon className="h-6 w-6" />
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
