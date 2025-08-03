import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { bot } from "@prisma/client";
import { Send } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";

export function UserChat({
  bot,
  session,
  chatId,
}: {
  bot: bot & { user: { name: string | null } };
  session: Session;
  chatId: string;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="w-full flex flex-row gap-3 h-20 items-center px-6">
        <Image
          src={bot.image}
          alt="bot image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-md">{bot.name}</span>
          {bot.user.name && (
            <span className="text-sm text-muted-foreground">
              by @{bot.user.name}
            </span>
          )}
        </div>
      </div>

      {/* Chat or Bio Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        {bot.bio && (
          <p className="text-center text-muted-foreground text-md py-6 max-w-md">
            {bot.bio}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="w-full px-6 pb-4">
        <div className="flex flex-row items-center gap-4">
          <Textarea
            className="h-4 resize-none overflow-hidden text-sm py-2 px-3"
            placeholder="Say something..."
            rows={1}
          />
          <Button className="rounded-full p-3" size="icon">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}