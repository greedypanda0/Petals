import { Main } from "@/components/main";
import { Profile } from "@/features/profile/components/Profile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/auth/login");

  return (
    <Main>
      <Profile session={session} />
    </Main>
  );
}
