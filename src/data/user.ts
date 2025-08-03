import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  try {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
}

export async function getUserNyName(name: string) {
  try {
    return prisma.user.findUnique({
      where: {
        name,
      },
    });
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch {
    return null;
  }
}

export async function updateUserByEmail(email: string, data: object) {
  try {
    return prisma.user.update({
      where: {
        email,
      },
      data: {
        ...data,
      },
    });
  } catch {
    return null;
  }
}
