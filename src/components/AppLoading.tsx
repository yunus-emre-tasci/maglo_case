"use client";

import { useAuth } from "@/context/AuthContext";
import { Loading } from "@/components/ui/Loading";

export function AppLoading() {
  const { isLoading } = useAuth();

  if (!isLoading) return null;

  return <Loading size="lg" text="Loading Maglo..." fullScreen />;
}
