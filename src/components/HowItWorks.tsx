import { Fingerprint, Lock, ScanLine, Shield } from "lucide-react";

const steps = [
  {
    title: "Step 1: User enters private data locally",
    body: "Input never leaves the browser during proof creation.",
    icon: Lock,
  },
  {
    title: "Step 2: App creates hashed commitment",
    body: "Sensitive fields are combined with a secret phrase and hashed with SHA-256.",
    icon: Fingerprint,
  },
  {
    title: "Step 3: Public proof is generated",
    body: "A verifier code, proof hash, and public eligibility claims are produced.",
    icon: Shield,
  },
  {
    title: "Step 4: Verifier checks proof without raw data",
    body: "Verification only reveals claim results and commitment metadata.",
    icon: ScanLine,
  },
];

export default function HowItWorks() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <h2 className="font-display text-2xl text-white">How It Works</h2>
      <p className="mt-2 text-sm text-slate-300">
        ProofPass simulates a privacy-preserving flow aligned with Midnight principles.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="rounded-xl border border-white/10 bg-midnight-900/70 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-indigo-500/20 p-2 text-indigo-200">
                <Icon size={17} />
              </div>
              <h3 className="font-display text-lg text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{step.body}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-5 rounded-xl border border-indigo-300/20 bg-indigo-500/10 p-4 text-sm text-indigo-100">
        <p className="font-semibold text-white">Midnight relevance</p>
        <p className="mt-1">
          This MVP keeps sensitive attributes private and exposes only commitments plus public outcomes. On Midnight,
          the same flow can be anchored on-chain with private state logic and selective disclosure.
        </p>
      </div>
    </section>
  );
}
