"use client";
import { botSchema, BotSchema } from "@/schema/bot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BotFormImage } from "./bot-form-image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BotFormButtons } from "./bot-form-buttons";
import { registerBot } from "../action/register-bot";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload-image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export function BotForm({ session }: { session: Session }) {
  const router = useRouter();
  const form = useForm<BotSchema>({
    resolver: zodResolver(botSchema),
    defaultValues: {
      name: "",
      bio: "",
      systemMessage: "",
    },
  });
  const [isMounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: BotSchema) => {
    try {
      setLoading(true);
      if (!file) {
        throw new Error("Please select an image.");
      }
      const { url, error } = await uploadImage(
        session.user?.id as string,
        file
      );
      if (error) {
        throw new Error("Error uploading image");
      }

      const payload = {
        ...data,
        userId: session.user?.id as string,
        image: url,
      };
      const res = await registerBot(payload);
      if (!res.ok) {
        throw new Error("Error while registering bot.");
      }

      toast.success("Bot registered successfully");
      router.push(`/bots/u/${session.user?.name}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Unknown error";

      toast.error("Error while registering bot", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;
  return (
    <div className="w-full flex flex-col">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="h-24 w-full flex flex-row items-center gap-4">
            <BotFormImage setFile={(file) => setFile(file)} />
            <FormField
              disabled={loading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="What you gonna call it ?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            disabled={loading}
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BIO</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What goonna be bio ?"
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={loading}
            control={form.control}
            name="systemMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SYSTEM MESSAGE</FormLabel>
                <FormControl>
                  <Textarea placeholder="who is it ?" {...field} rows={8} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <BotFormButtons loading={loading} />
        </form>
      </Form>
    </div>
  );
}
