import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { json } from "@/lib/utils";
import { PayloadBot, ReturnBot, BotResponse } from "@/types/Bot";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response("You requested item");
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return json({ error: "Unauthorized" }, 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    return json({ error: "User not found" }, 404);
  }

  const raw = await req.json();
  const parsed = PayloadBot.safeParse(raw);

  if (!parsed.success) {
    return json({ error: parsed.error.format() }, 400);
  }

  const { name, bio, image, system_message } = parsed.data;

  const created = await prisma.bot.create({
    data: {
      name,
      bio,
      image,
      system_message: system_message.replace(/\s+/g, " ").trim(),
      user_id: user.id,
    },
  });

  const response: BotResponse = {
    ...created,
    user: {
      id: user.id,
      name: user.name ?? "Anonymous",
    },
  };

  const validated = ReturnBot.parse(response);

  return json({ success: true, bot: validated }, 201);
}
