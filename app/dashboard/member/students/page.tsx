"use client";


import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const { res, data } = await apiFetch("/api/students");
    if (res.ok) setStudents(data.students);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Students</h1>

        <button
          onClick={() => router.push("/dashboard/students/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Student
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {students.map((s: any) => (
          <div key={s.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">{s.name}</h2>
            <p className="text-gray-600">{s.email}</p>

            <div className="mt-4 flex gap-3">
              <button
                className="px-3 py-1 bg-gray-700 text-white rounded"
                onClick={() => router.push(`/dashboard/students/${s.id}/view`)}
              >
                View
              </button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => router.push(`/dashboard/students/${s.id}/edit`)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
