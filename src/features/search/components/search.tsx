"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBotsByName } from "@/data/bot";
import { BotList } from "@/features/bots/components/bot-list";
import { useDebounce } from "@/hooks/debounce";
import { bot } from "@prisma/client";
import { SearchCheck } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

export default function Search() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);
  const [bots, setBots] = useState<(bot & { user: { name: string | null } })[]>(
    []
  );

  useEffect(() => {
    if (debouncedInput.length < 1) {
      setBots([]);
      return;
    }

    startTransition(async () => {
      const bots = await getBotsByName(debouncedInput);
      console.log(bots)
      setBots(bots);
    });
  }, [debouncedInput]);

  console.log(debouncedInput, bots)

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-20 w-full flex items-center gap-4 p-2">
        <Input
          placeholder="Search..."
          className="rounded-full text-xl p-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button size="icon" className="rounded-full">
          <SearchCheck size={30} className="hover:text-accent" />
        </Button>
      </div>
      <BotList bots={bots} withAddButton={false} />
    </div>
  );
}
