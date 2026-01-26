"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  User,
  Mail,
  Lock,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    department: "",
    yearOfStudy: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      alert("Registration successful! Check your email to verify your account.");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Join Engineering Tech Builders Club
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Create your account and start building with us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6">
          {/* Full Name */}
          <InputField
            label="Full Name"
            icon={<User />}
            placeholder="John Doe"
            value={form.fullName}
            onChange={(v) => setForm({ ...form, fullName: v })}
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            icon={<Mail />}
            placeholder="your.email@gmail.com"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Password"
              type="password"
              icon={<Lock />}
              placeholder="••••••••"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
            />

            <InputField
              label="Confirm Password"
              type="password"
              icon={<Lock />}
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(v) => setForm({ ...form, confirmPassword: v })}
            />
          </div>

          {/* Optional Section */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Optional academic details
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Student ID"
                placeholder="e.g. 221000123"
                value={form.studentId}
                onChange={(v) => setForm({ ...form, studentId: v })}
              />

              <TextInput
                label="Department"
                placeholder="e.g. Computer Engineering"
                value={form.department}
                onChange={(v) => setForm({ ...form, department: v })}
              />
            </div>

            <div className="mt-4">
              <TextInput
                label="Year of Study"
                placeholder="e.g. Year 3"
                value={form.yearOfStudy}
                onChange={(v) => setForm({ ...form, yearOfStudy: v })}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

/* ---------------- Reusable Inputs ---------------- */

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
}

function TextInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
    </div>
  );
}
