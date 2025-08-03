"use server"

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schema/auth";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchema): Promise<{
  ok: boolean;
  error?: string;
}> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { ok: false, error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error(error)
    return { ok: false, error: "Registration failed. Try again." };
  }
}
