import { Main } from "@/components/main";
import { getChatsByUserId } from "@/data/chat";
import { ChatLogs } from "@/features/chats/chat-logs";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ChatLog() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/auth/login");
  }

  const chats = await getChatsByUserId(session.user.id);

  return (
    <Main>
      <ChatLogs chats={chats} />
    </Main>
  );
}
