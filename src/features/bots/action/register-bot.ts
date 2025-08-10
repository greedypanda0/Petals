"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { BotSchema } from "@/schema/bot";

export async function registerBot(
  data: BotSchema & { image: string; userId: string }
): Promise<{
  ok: boolean;
  error?: string;
}> {
  try {
    const slug = slugify(data.name);
    const existing = await prisma.bot.findUnique({
      where: {
        name: slug,
      },
    });
    if (existing) {
      return { ok: false, error: "Bot with this name already exists" };
    }

    await prisma.bot.create({
      data: {
        ...data,
        username: data.name,
        name: slug,
      },
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
