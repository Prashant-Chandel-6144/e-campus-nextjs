"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session, router]);

  if (isPending || session) return <p>Loading...</p>;

  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
          callbackURL: "http://localhost:3000/dashboard",
        })
      }
    >
      Sign in with Google
    </Button>
  );
}