"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Folder, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { RecentUsers } from "@/components/dashboard/RecentUsers";
import RecentProjects from "@/components/dashboard/RecentProjects";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/admin")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* KPIs */}
      <div className="grid md:grid-cols-3 gap-6">
        <Stat icon={<Users />} label="Users" value={data.users.length} />
        <Stat icon={<Folder />} label="Projects" value={data.projects.length} />
        <Stat icon={<AlertTriangle />} label="Low Inventory" value={data.inventory.length} />
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentUsers users={data.users} />
        <RecentProjects projects={data.projects} />
      </div>
    </motion.div>
  );
}

function Stat({ icon, label, value }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        {icon}
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">{value}</CardContent>
    </Card>
  );
}
