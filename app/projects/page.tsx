"use client";

import { useState, useEffect } from "react";
import { Loader2, Search, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "completed" | "pending"
  >("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects?page=1&limit=12");
        const data = await res.json();
        if (data.success) setProjects(data.projects || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects
    .filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()),
    )
    .filter((p) => (statusFilter === "all" ? true : p.status === statusFilter));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HERO */}
        <div className="bg-base-100 rounded-2xl shadow p-6">
          <h1 className="text-4xl font-bold">Projects Showcase</h1>
          <p className="text-lg text-base-content/70 mt-2">
            Discover what the Engineering Tech Builders Club members are
            creating
          </p>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row gap-3 mt-6 items-center">
            <div className="flex items-center w-full md:w-2/3 bg-base-200 rounded-xl p-3">
              <Search className="mr-2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Search projects by title or description..."
              />
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <button
                className={`btn btn-sm px-4 py-0.5 border-2 border-gray-100 rounded-xl hover:bg-gray-400 hover:text-white transition duration-800 ease-in-out  ${statusFilter === "all" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                className={`btn btn-sm px-2 py-0.75 border-2 border-gray-100 rounded-xl hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out  ${statusFilter === "active" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setStatusFilter("active")}
              >
                Active
              </button>
              <button
                className={`btn btn-sm px-2 py-0.75 border-2 border-gray-100 rounded-xl hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out  ${statusFilter === "completed" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </button>
              <button
                className={`btn btn-sm px-2 py-0.75 border-2 border-gray-100 rounded-xl hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out  ${statusFilter === "pending" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* PROJECT GRID */}
        {filteredProjects.length === 0 ? (
          <div className="alert alert-info shadow-lg py-6 px-4">
            No projects found. Try another search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj: any) => (
              <div
                key={proj.project_id}
                className="relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="badge badge-outline">
                      {proj.status.replace("_", " ")}
                    </div>
                    <div className="badge badge-ghost">
                      By {proj.createdBy.fullName}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mt-4 line-clamp-2">
                    {proj.title}
                  </h2>

                  <p className="text-sm text-base-content/70 mt-3 line-clamp-3">
                    {proj.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-base-content/60">
                      {new Date(proj.createdAt).toLocaleDateString()}
                    </span>

                    <Link
                      href={`/projects/${proj.project_id}`}
                      className="btn btn-sm  btn-outline gap-2"
                    >
                      View Project <ArrowRight size={16} />
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
