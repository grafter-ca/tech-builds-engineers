"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock } from "lucide-react";
import { InputFieldProps } from "@/types";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Temporary storage (later: httpOnly cookies)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user?.role?.toLowerCase();

      switch (role) {
        case "admin":
          router.replace("/dashboard/admin");
          break;
        case "coordinator":
          router.replace("/dashboard/coordinator");
          break;
        case "mentor":
          router.replace("/dashboard/mentor");
          break;
        case "member":
          router.replace("/dashboard/member");
          break;
        default:
          router.replace("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back 👋
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Sign in to access Engineering Tech Builders Club
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email address"
            type="email"
            icon={<Mail />}
            placeholder="your.email@gmail.com"
            value={form.email}
            autoComplete="email"
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <InputField
            label="Password"
            type="password"
            icon={<Lock />}
            placeholder="••••••••"
            value={form.password}
            autoComplete="current-password"
            onChange={(v) => setForm({ ...form, password: v })}
          />

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <span />
            <button
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/auth/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  autoComplete,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center text-gray-400">
        <input
          type={type}
          required
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
