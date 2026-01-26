"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "../buttons/JoinCTA";

const DASHBOARD_LINKS = {
  member: [
    { name: "My Projects", href: "/dashboard/member/projects" },
    { name: "Events", href: "/dashboard/member/events" },
    { name: "Payments", href: "/dashboard/member/payments" },
    { name: "Resources", href: "/dashboard/member/resources" },
    { name: "Achievements", href: "/dashboard/member/achievements" },
    { name: "Notifications", href: "/dashboard/member/notifications" },
    { name: "Settings", href: "/dashboard/member/settings" },
    { name: "Feedback", href: "/dashboard/member/feedback" },
    
  ],
  coordinator: [
    { name: "Manage Inventory", href: "/dashboard/coordinator/inventory" },
    { name: "Announcements", href: "/dashboard/coordinator/news" },
    { name: "Member List", href: "/dashboard/coordinator/users" },
    { name: "Event Scheduling", href: "/dashboard/coordinator/events" },
    { name: "Resource Allocation", href: "/dashboard/coordinator/resources" },
    { name: "Reports", href: "/dashboard/coordinator/reports" },
    { name: "Project Oversight", href: "/dashboard/coordinator/projects" },
    { name: "Financial Management", href: "/dashboard/coordinator/finances" },
    { name: "Mentor Coordination", href: "/dashboard/coordinator/mentors" },
  ],
  admin: [
    { name: "Financial Overview", href: "/dashboard/admin/finances" },
    { name: "Payments", href: "/dashboard/member/payments" },
    { name: "User Management", href: "/dashboard/admin/users" },
    { name: "System Settings", href: "/dashboard/admin/settings" },
    { name: "Audit Logs", href: "/dashboard/admin/logs" },
    { name: "Member List", href: "/dashboard/coordinator/users" },

  ],
  instructor: [
    { name: "Course Materials", href: "/dashboard/instructor/courses" },
    { name: "Student Progress", href: "/dashboard/instructor/progress" },
    { name: "Reports", href: "/dashboard/instructor/reports" },
    { name: "User Management", href: "/dashboard/admin/users" },
    { name: "Assignments", href: "/dashboard/instructor/assignments" },
  ],
};

export default function Sidebar({
  role,
}: {
  role: "member" | "coordinator" | "admin" | "instructor";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <header className="md:hidden flex items-center justify-between bg-blue-600 text-white px-4 py-3">
        <h1 className="font-bold text-lg">Tech Build E.</h1>
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-blue-600 text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* ===== Sidebar Container ===== */}
        <div className="flex flex-col h-full p-6">
          {/* ---------- Header ---------- */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Tech Build E.</h2>
            <button className="md:hidden" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* ---------- Navigation ---------- */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {DASHBOARD_LINKS[role].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg transition ${
                  pathname === link.href
                    ? "bg-white text-blue-600 font-medium"
                    : "hover:bg-blue-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ---------- Footer Actions ---------- */}
          <div className="pt-6 mt-6 border-t border-blue-400 space-y-4">
            <Button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
              label="Logout"
            />

            <Link
              href={`/dashboard/${role}`}
              onClick={() => setOpen(false)}
              className="block text-center py-3 rounded-lg hover:bg-blue-500 transition"
            >
              Dashboard Home
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
