"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/dashboard/students")}
      >
        Manage Students
      </button>
    </div>
  );
}
