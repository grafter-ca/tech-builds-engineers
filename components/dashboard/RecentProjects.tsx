"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, Users } from "lucide-react";

type Project = {
  project_id: number;
  title: string;
  status: string;
  updatedAt: string;
  createdBy?: {
    fullName: string;
  };
  members?: { userId: number }[];
};

export default function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="admin-card"
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Projects</CardTitle>

          <Link
            href="/dashboard/admin/projects"
            className="text-sm text-indigo-600 font-semibold flex items-center gap-1 hover:underline"
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Members</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-sm text-slate-400 py-6"
                  >
                    No projects found
                  </TableCell>
                </TableRow>
              )}

              {projects.map((project) => (
                <TableRow
                  key={project.project_id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-semibold text-slate-800">
                    {project.title}
                  </TableCell>

                  <TableCell className="text-sm text-slate-500">
                    {project.createdBy?.fullName || "—"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                      ${
                        project.status === "active"
                          ? "bg-green-100 text-green-700"
                          : project.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-right text-sm text-slate-500">
                    <div className="flex items-center justify-end gap-1">
                      <Users size={14} />
                      {project.members?.length || 0}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
