import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function json(data: object, status: number = 200) {
  return new Response(
    JSON.stringify({
      ...data,
      data_time: new Date(),
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
