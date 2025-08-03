import { Main } from "@/components/main";
import { getBotsByUsername } from "@/data/bot";
import { BotList } from "@/features/bots/components/bot-list";

export default async function UserBotsPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;
  const bots = await getBotsByUsername(user);

  return (
    <Main>
      <BotList bots={bots} withAddButton={true} />
    </Main>
  );
}
