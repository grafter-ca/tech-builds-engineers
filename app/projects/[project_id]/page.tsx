"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle, User, Link as LinkIcon } from "lucide-react";

export default function ProjectDetailPage() {
  const { project_id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${project_id}`);
        if (!res.ok) throw new Error("Failed to load project");

        const data = await res.json();
        setProject(data.project);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [project_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
        <div className="alert alert-error max-w-lg shadow-xl">
          <AlertCircle className="h-6 w-6" />
          <span>{error || "Project not found"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="btn btn-ghost mb-6 gap-2">
          ← Back to Projects
        </button>

        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="badge badge-outline text-lg">{project.status.replace("_", " ")}</div>
              <div className="badge badge-ghost">Created by {project.createdBy.fullName}</div>
            </div>

            <p className="text-lg mb-8">{project.description || "No description available."}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {project.githubUrl && (
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <LinkIcon size={18} />
                    GitHub Repository
                  </h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary break-all"
                  >
                    {project.githubUrl}
                  </a>
                </div>
              )}

              {project.demoUrl && (
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <LinkIcon size={18} />
                    Live Demo
                  </h3>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary break-all"
                  >
                    {project.demoUrl}
                  </a>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.members.length === 0 ? (
                <p className="text-base-content/70">No team members yet</p>
              ) : (
                project.members.map((m: any) => (
                  <div key={m.userId} className="flex items-center gap-3 bg-base-200 p-4 rounded-lg">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span className="text-lg">{m.user.fullName[0]}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{m.user.fullName}</p>
                      <p className="text-sm text-base-content/70 capitalize">{m.role}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}