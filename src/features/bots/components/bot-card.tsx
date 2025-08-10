import { slugify } from "@/lib/utils";
import { bot } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BotCard({
  bot,
}: {
  bot: bot & { user?: { name: string | null } };
}) {
  return (
    <Link href={`/bots/${slugify(bot.name)}/chat/`}>
      <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-200">
        {/* Image with aspect ratio */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
          <Image
            src={bot.image}
            alt={`${bot.name} profile`}
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col overflow-hidden">
          <p className="text-lg font-semibold truncate">{bot.username}</p>
          {bot.user?.name && (
            <p className="text-sm text-muted-foreground truncate">
              by {bot.user.name}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {bot.bio || "No description provided."}
          </p>
        </div>
      </div>
    </Link>
  );
}
