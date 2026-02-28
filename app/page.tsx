"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/stores/useUser";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    useUser.getState().setUser(null);
    router.refresh();
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <div className="w-full max-w-2xl space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome to V0 Clone
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              A full-stack Next.js 14 application with Supabase Auth and Prisma
              integration.
            </p>
          </div>

          {!user ? (
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Log in to your account
              </Link>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                or
              </span>
              <Link
                href="/signup"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                create a new account
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Image
                src={user.user_metadata.avatar_url || "/default-avatar.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {user.user_metadata.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 text-sm font-medium text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
