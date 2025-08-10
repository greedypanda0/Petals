import { bot } from "@prisma/client";
import BotCard from "./bot-card";
import { Plus } from "lucide-react";
import Link from "next/link";

export function BotList({
  bots,
  withAddButton = false,
}: {
  bots: (bot & { user: { name: string | null } })[];
  withAddButton?: boolean;
}) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-4">
      {withAddButton && (
        <Link href="/bots/create">
          <div className="h-32 rounded-lg border border-dashed border-muted-foreground flex justify-center items-center hover:bg-accent transition-colors">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
        </Link>
      )}
      {bots.map((item) => (
        <BotCard bot={item} key={item.name} />
      ))}
    </div>
  );
}