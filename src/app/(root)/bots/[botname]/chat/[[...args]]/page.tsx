import { Main } from "@/components/main";
import { getBotByname } from "@/data/bot";
import { createNewChat, getChatByid } from "@/data/chat";
import { UserChat } from "@/features/bots/components/bot-chat";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ botname: string; args?: string[] }>;
}) {
  const { botname, args } = await params;
  let chatId = args ? args[0] : null;
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }
  const bot = await getBotByname(botname);
  if (!bot) {
    return notFound();
  }

  if (chatId) {
    const res = await getChatByid(chatId);
    if (!res) {
      return notFound();
    }
  } else {
    chatId = await createNewChat(bot.id, session.user.id!);
  }

  return (
    <Main headbar={false} footer={false}>
      <UserChat bot={bot} session={session} chatId={chatId as string} />
    </Main>
  );
}
