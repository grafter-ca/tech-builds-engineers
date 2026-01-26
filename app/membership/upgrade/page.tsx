"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, AlertCircle, ShieldCheck } from "lucide-react";

type MemberResponse = {
  member: {
    membershipStatus: "pending" | "active" | "inactive";
  };
};

export default function MembershipUpgradePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] =
    useState<MemberResponse["member"]["membershipStatus"]>("pending");

  const [error, setError] = useState<string | null>(null);

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

        const data: MemberResponse = await res.json();
        setMembershipStatus(data.member.membershipStatus);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [router]);

  const handleFakePayment = () => {
    alert(
      "In real app this would start MTN MoMo payment flow.\n\nFor now: membership activated (mock)."
    );
    setMembershipStatus("active");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (membershipStatus === "active") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-100 p-6">
        <Card className="w-full max-w-xl">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto mb-2 h-10 w-10 text-green-600" />
            <CardTitle>Your Membership Is Active</CardTitle>
            <CardDescription>
              You already have full access to the club features.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full"
            >
              Proceed to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto mb-3 h-12 w-12 text-yellow-500" />
            <CardTitle className="text-3xl">Activate Membership</CardTitle>
            <CardDescription className="text-base">
              Unlock full club access: create projects, join events, borrow tools,
              and earn points.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-bold text-slate-500">Fee</div>
                <div className="text-3xl font-black text-indigo-700 mt-2">
                  10,000 RWF
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  One-time Commitment
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-bold text-slate-500">Status</div>
                <div className="text-xl font-black text-slate-900 mt-2">
                  Pending Activation
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Complete payment to activate
                </div>
              </div>
            </div>

            <Button
              onClick={handleFakePayment}
              className="w-full flex items-center justify-center gap-3"
            >
              <CreditCard className="h-5 w-5" />
              Pay with MTN MoMo (Mock)
            </Button>

            <div className="flex items-center gap-1">
              <span className="h-0.5 bg-gray-200 w-1/2"></span>
              <span>OR</span>
              <span className="h-0.5 bg-gray-200 w-1/2"></span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div>
              <ShieldCheck className="h-5 w-5 inline-block mr-2 text-green-600" />
              <span className="text-sm text-slate-600">
                Pay via Code / Phone and notify a coordinator
              </span>
              </div>
            <div className="text-center text-sm text-slate-500">
              After payment, your status will update automatically. If not,
              contact a coordinator.
            </div>
            </div>


            <Button
              variant="ghost"
              onClick={() => window.location.href = "/"}
              className="w-full border-2 max-w-28 my-6 mx-auto"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
