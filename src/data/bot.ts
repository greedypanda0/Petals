import { prisma } from "@/lib/prisma";

export async function getBotsByUser(userId: string) {
  try {
    return prisma.bot.findMany({
      where: {
        userId,
      },
      select: {
        name: true,
        bio: true,
        createdAt: true,
        id: true,
        image: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getBotsByUsername(name: string) {
  try {
    return prisma.bot.findMany({
      where: {
        user: {
          name,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch {
    return [];
  }
}
export async function getBotByname(name: string) {
  try {
    return prisma.bot.findUnique({
      where: {
        name,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}
