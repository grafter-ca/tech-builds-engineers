"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      alert("Registered — now login");
      router.push("/auth/login");
    } else {
      alert(data.error || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow" onSubmit={submit}>
        <h2 className="text-2xl font-semibold mb-6">Create account</h2>

        <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input mt-4" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="input mt-4" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />

        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
