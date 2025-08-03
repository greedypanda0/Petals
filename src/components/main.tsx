import { auth } from "@/lib/auth";
import { AppNavbar } from "./app-sidebar";

export async function Main({
  children,
  headbar = true,
  footer = true,
}: {
  children: React.ReactNode;
  headbar?: boolean;
  footer?: boolean;
}) {
  const session = await auth();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col flex-1 overflow-y-auto justify-center items-center">
        {headbar && (
          <header className="flex h-16 items-center gap-2 px-4 max-w-5xl w-full">
            <span className="font-semibold text-lg">Petals</span>
          </header>
        )}

        <main className="max-w-5xl w-full h-full">{children}</main>
      </div>
      {footer && <AppNavbar session={session} />}
    </div>
  );
}
