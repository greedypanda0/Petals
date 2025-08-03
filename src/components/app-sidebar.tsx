"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaSearch, FaRegUserCircle } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import Link from "next/link";
import { cn, unslugify } from "@/lib/utils";
import { Session } from "next-auth";

const nav = [
  {
    label: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    label: "Search",
    href: "/search",
    icon: FaSearch,
  },
  {
    label: "Chats",
    href: "/chats",
    icon: IoIosChatbubbles,
  },
  {
    label: "you",
    href: "/profile",
    icon: FaRegUserCircle,
  },
];

export function AppNavbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <nav className="relative h-16 w-full border-t bg-background flex items-center justify-around shadow-md">
      {nav.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className="relative flex flex-col items-center gap-0.5 px-4 py-2"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex flex-col items-center text-sm transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="text-xl" />
              <span className="text-xs">
                {label.toLowerCase() === "you" && session?.user?.name
                  ? unslugify(session.user.name)
                  : label}
              </span>
            </motion.div>

            {/* Sliding active indicator */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute -bottom-1 w-6 h-1 rounded-full bg-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </nav>
  );
}
