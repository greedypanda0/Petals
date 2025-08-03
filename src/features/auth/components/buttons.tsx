"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthFormButtons({ loading }: { loading?: boolean }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 w-full">
      <Button
        variant="outline"
        className="w-1/2"
        type="button"
        disabled={loading}
        onClick={() => router.back()}
      >
        Cancel
      </Button>
      <Button className="w-1/2" type="submit" disabled={loading}>
        {loading && <Loader2Icon className="animate-spin mr-2 h-4 w-4" />}
        Proceed
      </Button>
    </div>
  );
}
