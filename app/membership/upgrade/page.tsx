"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";

export default function MembershipUpgradePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<string>("pending");

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("/api/members/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to check status");

        const data = await res.json();
        setMembershipStatus(data.member.membershipStatus);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [router]);

  const handleFakePayment = () => {
    alert("In real app this would start MTN MoMo payment flow.\n\nFor now: membership activated (mock).");
    // In real version: redirect to payment gateway or trigger MoMo API
    // After success: update membershipStatus to "active" via backend
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (membershipStatus === "active") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="alert alert-success max-w-lg shadow-xl">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6" />
            <span>Your membership is already active! No upgrade needed.</span>
          </div>
          <div className="mt-4">
            <button onClick={() => router.push("/dashboard")} className="btn btn-success">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10 flex items-center justify-center">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <div className="card-body p-8 md:p-12 text-center">
          <AlertCircle className="h-16 w-16 text-warning mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Activate Your Membership</h1>
          <p className="text-lg text-base-content/80 mb-8">
            To unlock full club features (create/join projects, borrow tools, attend events as participant, earn points), complete your membership subscription.
          </p>

          <div className="stats shadow bg-base-200 mb-8 w-full">
            <div className="stat place-items-center">
              <div className="stat-title">Required Fee</div>
              <div className="stat-value text-primary">10,000 RWF</div>
              <div className="stat-desc">One-time annual membership</div>
            </div>
          </div>

          <div className="space-y-4">
            <button onClick={handleFakePayment} className="btn btn-primary btn-lg w-full gap-3">
              <CreditCard size={20} />
              Pay with MTN MoMo (Mock)
            </button>

            <p className="text-sm text-base-content/60">
              After payment, your status will update automatically. If it doesn't, contact a coordinator.
            </p>

            <button onClick={() => router.push("/dashboard")} className="btn btn-ghost mt-4">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}