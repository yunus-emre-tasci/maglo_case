"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar, Header } from "@/components/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={logout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <Header user={user} />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-white overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
