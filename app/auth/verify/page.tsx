"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "success" | "error";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid or broken verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `/api/auth/verify?token=${token}&email=${email}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setStatus("success");
        setMessage(data.message);

        // Redirect after success
        setTimeout(() => {
          router.push("/auth/login");
        }, 4000);
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err.message || "Verification failed. Please request a new link."
        );
      }
    };

    verify();
  }, [token, email, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <h1 className="mt-6 text-xl font-semibold text-gray-800">
              Verifying your email
            </h1>
            <p className="mt-2 text-gray-500">
              Please wait a moment…
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-6 text-xl font-semibold text-gray-800">
              Email verified 🎉
            </h1>
            <p className="mt-2 text-gray-500">{message}</p>
            <p className="mt-4 text-sm text-gray-400">
              Redirecting to login…
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-600" />
            <h1 className="mt-6 text-xl font-semibold text-gray-800">
              Verification failed
            </h1>
            <p className="mt-2 text-gray-500">{message}</p>

            <button
              onClick={() => router.push("/auth/login")}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
