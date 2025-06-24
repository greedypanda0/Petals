import { prisma } from "@/lib/prisma";
import { json } from "@/lib/utils";
import { BotSchema } from "@/types/Bot";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response(`You requested item`);
}

export async function POST(req: NextRequest) {
  const raw = await req.json();
  const parsed = BotSchema.safeParse(raw);

  if (!parsed.success) {
    return json(
      {
        error: parsed.error.format(),
      },
      400
    );
  }

  const { name, bio } = parsed.data;

  const bot = await prisma.bot.create({
    data: {
      name,
      bio,
      user_id: "123456789012", // TODO: Replace with auth user ID
    },
  });

  return json(
    {
      success: true,
      bot,
    },
    201
  );
}
