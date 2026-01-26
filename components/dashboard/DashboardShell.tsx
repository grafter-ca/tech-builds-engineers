// components/dashboard/DashboardShell.tsx
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/TopNav";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ fullName: string; role: "member" | "coordinator" | "admin" } | null>(null);

  useEffect(() => {
    // This only runs in the browser
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user");
      }
    }
  }, []);

  if (!user) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 bg-blue-600 rounded-lg"></div>
        <p className="text-slate-400 font-medium">Initializing Dashboard...</p>
      </div>
    </div>
  );
}

  return (
    <div className="flex h-screen w-full bg-slate-50">
      {/* Sidebar gets the role, defaulting to 'member' if still loading */}
      <Sidebar role={(user?.role as "member" | "coordinator" | "admin") || "member"} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar userName={user?.fullName || "Loading..."} role={user?.role || ""} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}