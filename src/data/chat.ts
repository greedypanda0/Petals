import { prisma } from "@/lib/prisma";

export async function createNewChat(botId: string, userId: string) {
  try {
    const res = await prisma.chat.create({
      data: {
        userId,
        botId,
      },
    });

    return res.id;
  } catch {
    return null;
  }
}

export async function getChatByid(chatId: string) {
  try {
    return prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });
  } catch {
    return null;
  }
}

export async function getChatsByUserId(userId: string) {
  try {
    return prisma.chat.findMany({
      where: {
        userId,
      },
      include: {
        bot: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch {
    return [];
  }
}
