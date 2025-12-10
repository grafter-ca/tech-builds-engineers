"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function UpdatePasswordPage() {
  const { userId } = useAuth();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      setMessage("You must be logged in to update your password");
      return;
    }

    const token = localStorage.getItem("token"); // JWT for API auth

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId, // dynamically from JWT
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      });

      const text = await res.text();
      setMessage(text);
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Update Password
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
