"use client";

import Image from "next/image";
import { ProfileSections } from "./profile-sections";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { unslugify } from "@/lib/utils";

export function Profile({ session }: { session: Session }) {
  const user = session.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-4 px-3"
      >
        <Image
          src={`${
            user?.image
              ? user.image
              : `https://api.dicebear.com/9.x/thumbs/png?seed=${
                  user?.name ?? "user"
                }`
          }`}
          alt={`${user?.name ?? "User"}'s profile picture`}
          width={64}
          height={64}
          className="rounded-full border"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">
            {unslugify(user?.name ?? "Anonymous")}
          </span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </motion.div>

      <ProfileSections user={user} />
    </motion.div>
  );
}
