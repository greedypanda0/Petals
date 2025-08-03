"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schema/auth";
import { CardContent, CardFooter } from "@/components/ui/card";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AuthFormSocials } from "./socials";
import { AuthFormButtons } from "./buttons";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Divider } from "@/components/ui/divider";
import { registerUser } from "../action/register";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isMounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    const res = await registerUser(data);
    if (res.ok) {
      toast.success("Account created, you can login now!");
      await signIn("credentials", {
        ...data,
      });
    } else {
      toast.error("Error while registering user", {
        description: res.error,
      });
    }
    setLoading(false);
  };

  if (!isMounted) return null;
  return (
    <CardWrapper
      className="max-w-md w-full"
      headerTitle="Register"
      headerLabel="Fill your credentials!"
    >
      <CardFooter>
        <div className="w-full flex flex-col items-center gap-3">
          <AuthFormSocials loading={loading} />
          <Divider text="or continue with" />
        </div>
      </CardFooter>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              disabled={loading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="mahcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="hot@mail.co" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="mancodingisdead" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthFormButtons loading={loading} />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center text-sm mt-4">
        Already have an account?
        <Link href="/auth/login" className="px-2 underline">
          Login
        </Link>
      </CardFooter>
    </CardWrapper>
  );
}
