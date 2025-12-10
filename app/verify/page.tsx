"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const [message, setMessage] = useState("Verifying...");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("No token provided");
      return;
    }

    fetch(`/api/auth/verify?token=${token}`)
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch(() => setMessage("Verification failed"));
  }, [token]);

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      <p>{message}</p>
    </div>
  );
}
