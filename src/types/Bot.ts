import { z } from "zod";

export const BotSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  bio: z.string().max(200, "Bio too long"),
});

export type Bot = z.infer<typeof BotSchema>;
