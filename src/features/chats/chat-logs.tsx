"use client";

import { chat } from "@prisma/client";
import Image from "next/image";

export function ChatLogs({
  chats,
}: {
  chats: (chat & { bot: { image: string; name: string; username: string } })[];
}) {
  return (
    <div className="flex flex-col w-full">
      {chats.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors rounded-md"
        >
          <Image
            src={item.bot.image}
            width={60}
            height={60}
            alt={`${item.bot.name} profile`}
            className="rounded-md flex-shrink-0"
          />

          <div className="flex flex-col overflow-hidden">
            <span className="font-medium truncate">{item.bot.username}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
