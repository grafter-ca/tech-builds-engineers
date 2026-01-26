"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Early check for missing params
  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid or missing reset link. Please request a new one.");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      setStatus("success");
      setMessage(data.message || "Password reset successfully! Redirecting to login...");

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Reset Your Password
        </h1>
        <p className="text-gray-500 text-center mt-1">
          Choose a strong new password for your Engineering Tech Builders Club account
        </p>

        {status !== "idle" && (
          <div
            className={`mt-6 flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
              status === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : status === "error"
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-gray-50 border border-gray-200 text-gray-700"
            }`}
          >
            {status === "success" && <CheckCircle className="h-5 w-5 shrink-0" />}
            {status === "error" && <XCircle className="h-5 w-5 shrink-0" />}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                disabled={status === "loading" || !token || !email}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter new password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                disabled={status === "loading" || !token || !email}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || !token || !email}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
            {status === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Back to login
          </button>
        </p>
      </div>
    </div>
  );
}