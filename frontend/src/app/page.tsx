"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session, router]);

  if (isPending) return <p>Loading...</p>;

  if (session) {
    return (
      <div>
        <p>{session?.user?.email}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        })
      }
    >
      Sign in with Google
    </Button>
  );
}
