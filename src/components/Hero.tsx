import { ArrowRight, BadgeCheck, EyeOff, Fingerprint, Lock } from "lucide-react";

interface HeroProps {
  onCreate: () => void;
  onVerify: () => void;
}

export default function Hero({ onCreate, onVerify }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-700/25 via-slate-900/70 to-blue-700/20 p-8 shadow-glow sm:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.24),transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.25),transparent_45%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
            <BadgeCheck size={14} />
            Built for Midnight Hackathon 2026
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Prove eligibility without revealing personal data.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            ProofPass issues privacy-safe proof commitments so verifiers can confirm student status, age eligibility, and
            institution membership without ever seeing raw identity fields.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-indigo-300/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
            <Lock size={16} />
            ProofPass never reveals your raw personal data. It only shares verification results and proof commitments.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Browser-local hashing</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">No backend required</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Midnight-ready architecture</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Create Proof
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onVerify}
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
            >
              Verify Proof
            </button>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/15 bg-midnight-900/60 p-5 backdrop-blur-xl">
          <h2 className="font-display text-lg text-white">Verifier sees only:</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <EyeOff size={16} className="mt-0.5 text-indigo-300" />
              Raw fields hidden: name, student ID, email, secret phrase
            </li>
            <li className="flex items-start gap-2">
              <Fingerprint size={16} className="mt-0.5 text-indigo-300" />
              Commitment hash + timestamp + public claim status
            </li>
            <li className="flex items-start gap-2">
              <BadgeCheck size={16} className="mt-0.5 text-indigo-300" />
              Verifier code for instant demo verification
            </li>
          </ul>
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 p-3 text-xs text-emerald-200">
            Hackathon-ready flow: create proof in one screen, verify in one screen, no backend setup needed.
          </div>
        </div>
      </div>
    </section>
  );
}
