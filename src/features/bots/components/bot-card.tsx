import { bot } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BotCard({ bot }: { bot: bot }) {
  return (
    <Link href={`/bots/${bot.name}/chat/`} className="h-[250px]">
      <div className="group relative w-[150px] h-[250px] rounded-md overflow-hidden border-[6px] border-primary bg-primary transition-colors duration-200 hover:border-border hover:bg-accent">
        <Image
          src={bot.image}
          fill
          alt="bot profile"
          className="object-cover pointer-events-none select-none"
          draggable={false}
        />

        {/* Bottom overlay with text */}
        <div className="absolute bottom-0 left-0 w-full h-1/5 bg-primary transition-colors duration-200 flex items-center justify-center rounded-t-md group-hover:bg-accent">
          <p className="text-sm font-medium text-muted-foreground truncate px-2">
            {bot.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
