"use server";

import { supabase } from "./supabase";
import { v4 as uuid } from "uuid";

export async function uploadImage(userId: string, file: File) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${uuid()}.${fileExt}`;
  const bucket = "bot-images";

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    console.error("Image upload failed:", error.message);
    return { url: null, error };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { url: publicUrl, error: null };
}
