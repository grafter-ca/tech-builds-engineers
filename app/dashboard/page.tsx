"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  Trophy,
  Code,
  Calendar,
  Edit,
  CheckCircle2,
  Activity,
  User,
  Shield,
  Star,
} from "lucide-react";
import gsap from "gsap";

export default function MemberDashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error);

        setData(json);
      } catch (err: any) {
        setError(err.message);
        localStorage.removeItem("token");
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  useEffect(() => {
    if (!loading && data?.success) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.1 }
        );
      }

      gsap.fromTo(
        projectsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <AlertCircle />
          <span>{error || "Failed to load dashboard"}</span>
        </div>
      </div>
    );
  }

  const { user, member, cohort, projects, stats } = data;

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between gap-4 items-start"
        >
          <div>
            <h1 className="text-4xl font-bold">
              Welcome back, {user.fullName.split(" ")[0]} 👋
            </h1>
            <p className="text-base-content/70 mt-1">
              Engineering Tech Builders Club — Member Dashboard
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm bg-base-100 px-4 py-2 rounded-lg shadow">
            <Trophy size={16} />
            <span className="font-semibold">{stats.totalPoints}</span>
            <span className="text-base-content/60">points</span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-6">

            {/* STATUS CARDS */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-base-100 rounded-xl p-4 shadow"
            >
              <StatusItem icon={<Code size={18} />} label="Projects" value={projects.length} />
              <StatusItem icon={<User size={18} />} label="Cohort" value={cohort ? cohort.year : "—"} />
              <StatusItem icon={<Star size={18} />} label="Points" value={stats.totalPoints} />
              <StatusItem
                icon={<Shield size={18} />}
                label="Membership"
                value={member?.membershipStatus || "Pending"}
                highlight={stats.isFullMember ? "success" : "warning"}
              />
            </div>

            {/* MEMBERSHIP WARNING */}
            {!stats.isFullMember && (
              <div className="alert alert-warning">
                <AlertCircle />
                <span>
                  Membership inactive.{" "}
                  <Link href="/membership/upgrade" className="underline font-semibold">
                    Complete verification
                  </Link>
                </span>
              </div>
            )}

            {/* PROJECTS */}
            <div ref={projectsRef} className="bg-base-100 rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <Link href="/projects/my" className="btn btn-sm btn-outline">
                  View all
                </Link>
              </div>

              {projects.length === 0 ? (
                <div className="alert alert-info">
                  <AlertCircle />
                  <span>No projects yet. Start collaborating!</span>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.slice(0, 6).map((p: any) => (
                    <div key={p.project_id} className="card bg-base-200 hover:shadow-lg transition">
                      <div className="card-body">
                        <h3 className="card-title">{p.title}</h3>
                        <p className="text-sm line-clamp-2">
                          {p.description || "No description"}
                        </p>
                        <div className="card-actions justify-end">
                          <Link
                            href={`/projects/${p.project_id}`}
                            className="btn btn-sm btn-outline"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* QUICK ACTIONS */}
            <div className="bg-base-100 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <ActionButton href="/profile" icon={<Edit size={16} />} label="Edit Profile" />
                <ActionButton href="/projects" icon={<Code size={16} />} label="Browse Projects" />
                <ActionButton href="/events" icon={<Calendar size={16} />} label="Events" />
              </div>
            </div>

            {/* ACTIVITY SUMMARY */}
            <div className="bg-base-100 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-3">Activity Summary</h2>
              <div className="space-y-2">
                <ActivityLine label="Projects completed" value={stats.completedProjects} />
                <ActivityLine label="Pending reviews" value={stats.pendingReviews} />
                <ActivityLine label="Total logins" value={stats.totalLogins} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------
// Small Components
// ------------------------------------
function StatusItem({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
  highlight?: "success" | "warning";
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-base-content/70">
        {icon}
        <p className="text-sm">{label}</p>
      </div>
      <p
        className={`text-xl font-bold ${
          highlight === "success"
            ? "text-success"
            : highlight === "warning"
            ? "text-warning"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href} className="btn btn-outline gap-2 w-full justify-start">
      {icon}
      {label}
    </Link>
  );
}

function ActivityLine({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-base-200">
      <span className="text-sm text-base-content/70">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
