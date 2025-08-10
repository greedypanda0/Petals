"use client";

import Link from "next/link";
import { FaRobot, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { User } from "next-auth";

const sections = [
  {
    label: "My Bots",
    href: "/bots/u/",
    icon: FaRobot,
  },
  {
    label: "Logout",
    href: "/auth/logout",
    icon: FaSignOutAlt,
  },
];

export function ProfileSections({ user }: { user?: User }) {
  return (
    <div className="mt-6">
      <div className="space-y-2">
        {sections.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
          >
            <Link
              href={
                item.href === "/bots/u/" ? `/bots/u/${user?.name}` : item.href
              }
              className="flex items-center gap-3 rounded-md px-3 py-2 text-md text-foreground hover:bg-muted transition-colors"
            >
              {<item.icon className="text-muted-foreground" />}
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
