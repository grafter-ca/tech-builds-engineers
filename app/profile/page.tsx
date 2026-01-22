"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  AlertCircle,
  User,
  GraduationCap,
  Link as LinkIcon,
  ShieldCheck,
  Star,
  Settings,
  Edit,
} from "lucide-react";
import gsap from "gsap";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "security">("overview");

  const [form, setForm] = useState({
    skills: "",
    interests: "",
    bio: "",
    studentId: "",
    department: "",
    yearOfStudy: "",
    githubLink: "",
    linkedinLink: "",
  });

  const cardRef = useRef<HTMLDivElement>(null);

  /* -------------------------------
     Load profile (cookie auth)
  -------------------------------- */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/members/my");

        if (res.status === 401) {
          router.replace("/auth/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        const mem = data.member;

        setProfile(mem);
        setForm({
          skills: mem.skills?.join(", ") || "",
          interests: mem.interests?.join(", ") || "",
          bio: mem.user.bio || "",
          studentId: mem.user.studentId || "",
          department: mem.user.department || "",
          yearOfStudy: mem.user.yearOfStudy || "",
          githubLink: mem.user.githubLink || "",
          linkedinLink: mem.user.linkedinLink || "",
        });
      } catch (err: any) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  useEffect(() => {
    if (!loading && profile) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
  }, [loading, profile]);

  /* -------------------------------
     Save profile
  -------------------------------- */
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/members/my", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const user = profile.user;

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">My Profile</h1>
            <p className="text-base-content/70 mt-1">
              Manage your academic & club details
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="btn btn-outline gap-2"
              onClick={() => setActiveTab("overview")}
            >
              <Settings size={18} /> Overview
            </button>
            <button
              className="btn btn-primary gap-2"
              onClick={() => setActiveTab("edit")}
            >
              <Edit size={18} /> Edit Profile
            </button>
          </div>
        </div>

        {/* ALERT */}
        {message && (
          <div className={`alert ${message.includes("success") ? "alert-success" : "alert-error"}`}>
            <AlertCircle />
            <span>{message}</span>
          </div>
        )}

        {/* PROFILE CARD */}
        <div ref={cardRef} className="bg-base-100 rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-base-content/70">{user.email}</p>

                <div className="flex flex-wrap gap-3 mt-3">
                  {user.isVerified && (
                    <span className="badge badge-success gap-1">
                      <ShieldCheck size={14} /> Verified
                    </span>
                  )}
                  {profile.hasActiveSubscription ? (
                    <span className="badge badge-primary gap-1">
                      <Star size={14} /> Active Member
                    </span>
                  ) : (
                    <span className="badge badge-warning">Inactive</span>
                  )}
                  <span className="badge badge-outline capitalize">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="btn btn-outline gap-2"
                onClick={() => setActiveTab("edit")}
              >
                <Edit size={18} /> Edit
              </button>

              <button
                className="btn btn-primary gap-2"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save size={18} />}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-base-100 rounded-2xl shadow p-6">
          <div className="flex gap-3 border-b pb-3 mb-6">
            <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
              Overview
            </TabButton>
            <TabButton active={activeTab === "edit"} onClick={() => setActiveTab("edit")}>
              Edit Profile
            </TabButton>
            <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")}>
              Security
            </TabButton>
          </div>

          {activeTab === "overview" && (
            <OverviewTab profile={profile} user={user} />
          )}

          {activeTab === "edit" && (
            <EditTab form={form} setForm={setForm} />
          )}

          {activeTab === "security" && (
            <SecurityTab />
          )}
        </div>

      </div>
    </div>
  );
}

/* ------------------------------- */
/* UI Components */
/* ------------------------------- */

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`btn btn-sm gap-2 ${active ? "btn-primary" : "btn-outline"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function OverviewTab({ profile, user }: { profile: any; user: any }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="col-span-2 bg-base-200 rounded-xl p-5">
        <h3 className="text-lg font-bold mb-3">About</h3>
        <p className="text-base-content/70">
          {user.bio || "No bio added yet."}
        </p>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <InfoCard title="Student ID" value={user.studentId || "—"} />
          <InfoCard title="Department" value={user.department || "—"} />
          <InfoCard title="Year of Study" value={user.yearOfStudy || "—"} />
          <InfoCard title="Cohort" value={profile.cohort?.year || "—"} />
        </div>
      </div>

      <div className="bg-base-200 rounded-xl p-5">
        <h3 className="text-lg font-bold mb-3">Skills & Interests</h3>
        <p className="text-base-content/70">
          <b>Skills:</b> {profile.skills?.join(", ") || "—"}
        </p>
        <p className="text-base-content/70 mt-2">
          <b>Interests:</b> {profile.interests?.join(", ") || "—"}
        </p>
      </div>
    </div>
  );
}

function EditTab({
  form,
  setForm,
}: {
  form: any;
  setForm: (f: any) => void;
}) {
  return (
    <div className="space-y-6">
      <Section title="Academic Information" icon={<GraduationCap />}>
        <Grid>
          <Input
            label="Student ID"
            placeholder="e.g. 221000345"
            value={form.studentId}
            onChange={(v) => setForm({ ...form, studentId: v })}
          />
          <Input
            label="Department"
            placeholder="e.g. Mechanical Engineering"
            value={form.department}
            onChange={(v) => setForm({ ...form, department: v })}
          />
          <Input
            label="Year of Study"
            placeholder="e.g. Year 3"
            value={form.yearOfStudy}
            onChange={(v) => setForm({ ...form, yearOfStudy: v })}
          />
        </Grid>
      </Section>

      <Section title="Profile Details" icon={<User />}>
        <Grid>
          <Textarea
            label="Skills"
            placeholder="React, SolidWorks, ANSYS, Arduino, Python..."
            value={form.skills}
            onChange={(v) => setForm({ ...form, skills: v })}
          />
          <Textarea
            label="Interests"
            placeholder="Robotics, AI, Automotive design, IoT..."
            value={form.interests}
            onChange={(v) => setForm({ ...form, interests: v })}
          />
        </Grid>

        <Textarea
          label="Bio / About Me"
          placeholder="Briefly describe your background, passion, and goals..."
          value={form.bio}
          onChange={(v) => setForm({ ...form, bio: v })}
        />
      </Section>

      <Section title="Social & Professional Links" icon={<LinkIcon />}>
        <Grid>
          <Input
            label="GitHub Profile"
            placeholder="https://github.com/yourusername"
            value={form.githubLink}
            onChange={(v) => setForm({ ...form, githubLink: v })}
          />
          <Input
            label="LinkedIn Profile"
            placeholder="https://linkedin.com/in/yourusername"
            value={form.linkedinLink}
            onChange={(v) => setForm({ ...form, linkedinLink: v })}
          />
        </Grid>
      </Section>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-4">
      <div className="alert alert-info">
        <ShieldCheck />
        <span>Security features will be added here (password reset, 2FA, etc.)</span>
      </div>
      <div className="bg-base-200 rounded-xl p-5">
        <h3 className="text-lg font-bold">Security Status</h3>
        <p className="text-base-content/70 mt-2">
          Your profile is protected. Add two-factor authentication for better security.
        </p>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-base-100 rounded-xl p-4">
      <p className="text-sm text-base-content/60">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base-100 rounded-2xl shadow p-6 space-y-5">
      <div className="flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}

function Input({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input w-full mt-1 bg-base-100 border-2 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="textarea w-full mt-1 min-h-30 bg-base-100 border-2 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
