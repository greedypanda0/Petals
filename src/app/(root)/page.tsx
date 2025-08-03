import { Main } from "@/components/main";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <Main>
       <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      hello
    </Main>
  );
}
