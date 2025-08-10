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
      <div className="flex flex-col h-full w-full overflow-y-auto items-center">
        {headbar && (
          <div className="flex flex-none h-20 items-center gap-2 px-4 max-w-5xl w-full">
            <span className="font-semibold text-2xl">Petals</span>
          </div>
        )}

        <main className="flex-1 w-full max-w-5xl">{children}</main>
      </div>
      {footer && <AppNavbar session={session} />}
    </div>
  );
}
