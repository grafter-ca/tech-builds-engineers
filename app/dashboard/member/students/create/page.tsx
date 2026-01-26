"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStudent() {
  const router = useRouter();

  const [form, setForm] = useState({
    user_id: "",
    reg_number: "",
    field_study: "",
    level_study: "student",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert("Student created successfully!");
      router.push("/dashboard/students");
    } else {
      const data = await res.json();
      alert(data.error || "Error creating student");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Student Profile</h2>

      <form
        onSubmit={submit}
        className="grid gap-5 bg-white p-6 rounded-lg shadow"
      >
        <input
          placeholder="User ID (from users table)"
          className="input border p-2 rounded"
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          required
        />

        <input
          placeholder="Registration Number"
          className="input border p-2 rounded"
          value={form.reg_number}
          onChange={(e) => setForm({ ...form, reg_number: e.target.value })}
          required
        />

        <input
          placeholder="Field of Study"
          className="input border p-2 rounded"
          value={form.field_study}
          onChange={(e) => setForm({ ...form, field_study: e.target.value })}
          required
        />

        <select
          value={form.level_study}
          onChange={(e) =>
            setForm({ ...form, level_study: e.target.value })
          }
          className="input border p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="graduate">Graduate</option>
          <option value="other">Other</option>
        </select>

        <input
          placeholder="Phone Number"
          className="input border p-2 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
}
