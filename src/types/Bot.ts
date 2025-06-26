import { z } from "zod";

export const PayloadBot = z.object({
  name: z.string().min(1, "Name can't be empty"),
  bio: z.string().max(200, "Bio too long"),
  image: z.string(),
  system_message: z.string(),
});

export const ReturnBot = PayloadBot.extend({
  created_at: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type BotPayload = z.infer<typeof PayloadBot>; // 📨 Data from client
export type BotResponse = z.infer<typeof ReturnBot>; // 📤 Data to client
