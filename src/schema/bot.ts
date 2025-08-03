import { z } from "zod";

export const botSchema = z.object({
  name: z.string().min(1, "Name must be longer"),
  bio: z.string().min(1, "bio must be longer"),
  systemMessage: z.string().min(1, "System Message must be longer"),
});

export type BotSchema = z.infer<typeof botSchema>;
