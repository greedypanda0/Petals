import { bot } from "@prisma/client";
import BotCard from "./bot-card";
import { Plus } from "lucide-react";
import Link from "next/link";

export async function BotList({
  bots,
  withAddButton = false,
}: {
  bots: (bot & { user: { name: string | null } })[];
  withAddButton?: boolean;
}) {
  return (
    <div className="grid gap-4 justify-center [grid-template-columns:repeat(auto-fit,150px)] p-4">
      {withAddButton && (
        <Link href="/bots/create">
          <div className="w-[150px] h-[250px] rounded-md bg-card flex justify-center items-center">
            <Plus />
          </div>
        </Link>
      )}
      {bots.map((item, key) => (
        <BotCard bot={item} key={key} />
      ))}
    </div>
  );
}
