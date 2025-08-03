"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function AuthFormSocials({ loading }: { loading?: boolean }) {
  return (
    <div className="flex gap-2 w-full">
      <Button
        className="w-1/2 bg-[#24292F] hover:bg-[#1b1f23] text-white"
        aria-label="Login with GitHub"
        disabled={loading}
        onClick={() => signIn("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button
        className="w-1/2 bg-white hover:bg-gray-100 text-black border border-gray-300"
        aria-label="Login with Google"
        disabled={loading}
        onClick={() => signIn("google")}
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}
