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

  // Loading and Error states now return simple centered divs to fit inside the layout area
  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <AlertCircle />
          <span>{error || "Failed to load dashboard"}</span>
        </div>
      </div>
    );
  }

  const { user, member, cohort, projects, stats } = data;

  return (
    /* Note: Removed 'min-h-screen', 'bg-base-200', and 'p-6' 
       The Dashboard Layout Shell handles those now.
    */
    <div className="space-y-8">
      
      {/* HEADER */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row justify-between gap-4 items-start"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome back, {user.fullName.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Engineering Tech Builders Club — Member Dashboard
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
          <Trophy size={16} className="text-amber-500" />
          <span className="font-bold text-slate-800">{stats.totalPoints}</span>
          <span className="text-slate-500">points</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-6">

          {/* STATUS CARDS */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
          >
            <StatusItem icon={<Code size={18} className="text-blue-500" />} label="Projects" value={projects.length} />
            <StatusItem icon={<User size={18} className="text-purple-500" />} label="Cohort" value={cohort ? cohort.year : "—"} />
            <StatusItem icon={<Star size={18} className="text-yellow-500" />} label="Points" value={stats.totalPoints} />
            <StatusItem
              icon={<Shield size={18} />}
              label="Membership"
              value={member?.membershipStatus || "Pending"}
              highlight={stats.isFullMember ? "success" : "warning"}
            />
          </div>
          {/* MEMBERSHIP WARNING */}
          {!stats.isFullMember && (
            <div className="alert alert-warning shadow-sm border-none bg-amber-50 text-amber-800">
              <AlertCircle className="text-amber-600" />
              <span>
                Membership inactive.{" "}
                <Link href="/membership/upgrade" className="underline font-bold">
                  Complete verification
                </Link>
              </span>
            </div>
          )}
          {/* PROJECTS */}
          <div ref={projectsRef} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">My Projects</h2>
              <Link href="/projects/my" className="btn btn-sm btn-ghost border-slate-200">
                View all
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="alert bg-slate-50 border-slate-200">
                <AlertCircle className="text-slate-400" />
                <span className="text-slate-600 italic">No projects yet. Start collaborating!</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 6).map((p: any) => (
                  <div key={p.project_id} className="card bg-slate-50 border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                    <div className="card-body p-5">
                      <h3 className="card-title text-lg text-slate-800">{p.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {p.description || "No description provided."}
                      </p>
                      <div className="card-actions justify-end mt-2">
                        <Link
                          href={`/projects/${p.project_id}`}
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          View Details
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
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <ActionButton href="/profile" icon={<Edit size={16} />} label="Edit Profile" />
              <ActionButton href="/projects" icon={<Code size={16} />} label="Browse Projects" />
              <ActionButton href="/events" icon={<Calendar size={16} />} label="Events" />
            </div>
          </div>

          {/* ACTIVITY SUMMARY */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Activity Summary</h2>
            <div className="space-y-2">
              <ActivityLine label="Projects completed" value={stats.completedProjects} />
              <ActivityLine label="Pending reviews" value={stats.pendingReviews} />
              <ActivityLine label="Total logins" value={stats.totalLogins} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ------------------------------------
// Reusable Sub-Components (Unmodified logic)
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
      <div className="flex items-center gap-2 text-slate-500 font-medium">
        {icon}
        <p className="text-xs uppercase tracking-wider">{label}</p>
      </div>
      <p
        className={`text-xl font-black capitalize ${
          highlight === "success"
            ? "text-green-600"
            : highlight === "warning"
            ? "text-amber-500"
            : "text-slate-900"
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
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all font-semibold text-slate-700 text-sm">
      {icon}
      {label}
    </Link>
  );
}

function ActivityLine({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-slate-50 border border-slate-50">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="font-bold text-slate-900">{value}</span>
    </div>
  );
}