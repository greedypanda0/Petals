"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authModal";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function AuthDialog() {
  const { isAuthOpen, setAuth } = useAuthStore();
  const [variant, setVariant] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (variant === "register") {
      console.log("Registering:", form);
    } else {
      console.log("Logging in:", form);
    }
  };

  return (
    <Dialog open={isAuthOpen} onOpenChange={setAuth}>
      <DialogContent
        className={cn(
          "max-w-md w-full border-none bg-background/70 backdrop-blur-xl p-0 shadow-xl"
        )}
      >
        <div className="p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-semibold">Petals</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {variant === "login" ? "Welcome back" : "Create an account"}
            </p>
          </DialogHeader>

          <div className="mt-6 flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => signIn("github")}
            >
              <FaGithub className="h-4 w-4" /> Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => signIn("google")}
            >
              <FaGoogle className="h-4 w-4" /> Continue with Google
            </Button>
          </div>

          <div className="relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background relative z-10 px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {variant === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {variant === "login" ? "Login" : "Register"}
            </Button>

            <div className="text-center text-sm">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                className="underline underline-offset-4 cursor-pointer"
                onClick={() =>
                  setVariant(variant === "login" ? "register" : "login")
                }
              >
                {variant === "login" ? "Register" : "Login"}
              </span>
            </div>
          </form>

          <div className="mt-6 text-muted-foreground text-center text-xs">
            By continuing, you agree to our{" "}
            <a href="#" className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
