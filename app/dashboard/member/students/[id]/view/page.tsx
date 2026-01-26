"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ViewStudent() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      setStudent(data);
      setLoading(false);
    }
    loadStudent();
  }, [id]);

  if (loading) return <div className="p-6">Loading student...</div>;
  if (!student) return <div className="p-6">Student not found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Details</h1>

      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <p><strong>User ID:</strong> {student.user_id}</p>
        <p><strong>Reg Number:</strong> {student.reg_number}</p>
        <p><strong>Field of Study:</strong> {student.field_study}</p>
        <p><strong>Level:</strong> {student.level_study}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Paid:</strong> {student.is_payed ? "Yes" : "No"}</p>
        <p><strong>Created At:</strong> {student.created_at}</p>
        <p><strong>Updated At:</strong> {student.updated_at}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.push(`/dashboard/students/${id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this student?")) {
              await fetch(`/api/students/${id}`, { method: "DELETE" });
              router.push("/dashboard/students");
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
