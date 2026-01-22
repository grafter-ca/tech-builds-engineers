"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function MyProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchMyProjects = async () => {
      try {
        const res = await fetch("/api/projects/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load your projects");

        const data = await res.json();
        setProjects(data.projects || []);
        setUserId(data.user_id || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="alert alert-error max-w-lg shadow-xl">
          <AlertCircle className="h-6 w-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-base-content mb-8">My Projects</h1>

        {projects.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <AlertCircle className="h-6 w-6 shrink-0" />
            <div>
              <h3 className="font-bold">No projects yet</h3>
              <div className="text-sm">
                You are not part of any projects. Ask a coordinator to add you to a team!
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj: any) => (
              <div key={proj.project_id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <div className="card-body">
                  <h2 className="card-title line-clamp-1">{proj.title}</h2>
                  <p className="text-sm text-base-content/70 line-clamp-3 min-h-18">
                    {proj.description || "No description"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="badge badge-outline">{proj.status.replace("_", " ")}</div>
                    <div className="badge badge-ghost">
                      {proj.members.find((m: any) => m.userId === userId)?.role || "Member"}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link href={`/projects/${proj.project_id}`} className="btn btn-outline btn-sm gap-2">
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
  );
}