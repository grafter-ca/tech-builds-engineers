"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      // store token for now in localStorage (replace with cookies for production)
      if (data.token) localStorage.setItem("token", data.token);
      router.push("/dashboard/students");
    } else {
      console.log(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow" onSubmit={submit}>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="input mt-4" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />

        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
