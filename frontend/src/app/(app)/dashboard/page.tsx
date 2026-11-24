"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState<unknown>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`, {
      credentials: "include",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setMe)
      .catch((s) => {
        if (s === 401) router.replace("/sign-in");
      });
  }, [router]);

  return <pre>{JSON.stringify(me, null, 2)}</pre>;
}
