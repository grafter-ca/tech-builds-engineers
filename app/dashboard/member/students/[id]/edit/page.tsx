"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStudent() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load student info
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      setForm(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!form) return <div className="p-6">Student not found.</div>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (res.ok) {
      router.push(`/dashboard/students/${id}/view`);
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>

      <form
        onSubmit={submit}
        className="grid gap-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          className="input border p-2 rounded"
          value={form.reg_number}
          onChange={(e) => setForm({ ...form, reg_number: e.target.value })}
          placeholder="Reg Number"
        />

        <input
          className="input border p-2 rounded"
          value={form.field_study}
          onChange={(e) => setForm({ ...form, field_study: e.target.value })}
          placeholder="Field Study"
        />

        <select
          className="input border p-2 rounded"
          value={form.level_study}
          onChange={(e) => setForm({ ...form, level_study: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="graduate">Graduate</option>
          <option value="other">Other</option>
        </select>

        <input
          className="input border p-2 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
        />

        <button
          disabled={saving}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
