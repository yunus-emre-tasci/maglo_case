"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loading } from "@/components/ui/Loading";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/signin");
      }
    }
  }, [user, isLoading, router]);

  return <Loading size="lg" text="Loading Maglo..." fullScreen />;
}
