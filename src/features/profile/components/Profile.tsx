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
      className="w-full h-full p-6 flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex flex-col items-center text-center gap-3"
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
          width={128}
          height={128}
          className="rounded-full border-4 border-primary shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold">
            {unslugify(user?.name ?? "Anonymous")}
          </span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </motion.div>

      <div className="mt-8 w-full max-w-3xl">
        <ProfileSections user={user} />
      </div>
    </motion.div>
  );
}
