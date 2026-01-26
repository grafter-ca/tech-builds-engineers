// components/Topbar.tsx
export default function Topbar({ userName, role }: { userName: string, role: string }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      {/* Left side of Topbar */}
      <div className="text-sm text-slate-500 font-medium">
        Dashboard / <span className="text-slate-900 capitalize">{role}</span>
      </div>

      {/* Right side of Topbar */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">{userName.split(" ")[0]}</p>
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">{role}</p>
        </div>
        <div className="h-9 w-9 bg-slate-200 rounded-full border border-slate-300 overflow-hidden flex items-center justify-center font-black text-slate-500 text-2xl">
           {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}