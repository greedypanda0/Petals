"use server";

import { prisma } from "@/lib/prisma";
import { BotSchema } from "@/schema/bot";

export async function registerBot(
  data: BotSchema & { image: string; userId: string }
): Promise<{
  ok: boolean;
  error?: string;
}> {
  try {
    const existing = await prisma.bot.findUnique({
      where: {
        name: data.name,
      },
    });
    if (existing) {
      return { ok: false, error: "Bot with this name already exists" };
    }

    await prisma.bot.create({
      data: {
        ...data,
      },
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
