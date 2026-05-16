import { ShieldCheck } from "lucide-react";

export type AppView = "home" | "create" | "verify" | "how";

interface NavbarProps {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
}

const links: Array<{ id: AppView; label: string }> = [
  { id: "home", label: "Home" },
  { id: "create", label: "Create Proof" },
  { id: "verify", label: "Verify Proof" },
  { id: "how", label: "How It Works" },
];

export default function Navbar({ activeView, onChangeView }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-midnight-950/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-2 self-start rounded-lg transition hover:opacity-90"
          onClick={() => onChangeView("home")}
        >
          <span className="rounded-lg bg-indigo-500/20 p-2 text-indigo-200">
            <ShieldCheck size={18} />
          </span>
          <span className="font-display text-lg font-semibold text-white">ProofPass</span>
        </button>
        <div className="no-scrollbar w-full overflow-x-auto sm:w-auto sm:overflow-visible">
          <div className="flex min-w-max items-center gap-2 sm:min-w-0">
            {links.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onChangeView(link.id)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
