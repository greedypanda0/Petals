import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUserNyName } from "@/data/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomPFP(seed?: number | string): string {
  const styles = [
    "thumbs",
    "bottts",
    "avataaars",
    "adventurer",
    "big-ears",
    "notionists",
    "micah",
    "shapes",
    "fun-emoji",
    "croodles",
    "lorelei",
  ];

  const style = styles[Math.floor(Math.random() * styles.length)];
  seed = seed ?? Math.floor(Math.random() * 1000);

  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}`;
}

export async function generateUniqueUsername(base: string): Promise<string> {
  let username = base;
  const suffix = () => Math.floor(Math.random() * 100);
  let exists = await getUserNyName(username);

  while (exists) {
    const nextUsername = `${username}-${suffix()}`;
    exists = await getUserNyName(nextUsername);
    if (!exists) {
      username = nextUsername;
      break;
    }
  }

  return username;
}

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
}

export function unslugify(str: string) {
  return str.replace(/-+/g, " ");
}
