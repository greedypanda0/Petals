import { Main } from "@/components/main";
import { BotForm } from "@/features/bots/components/bot-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Create() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <Main>
      <div className="w-full h-full flex p-6 justify-center">
        <div className="max-w-md w-full">
          <BotForm session={session} />
        </div>
      </div>
    </Main>
  );
}
