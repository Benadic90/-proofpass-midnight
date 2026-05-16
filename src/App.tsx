import { BadgeCheck, Building2, GraduationCap, Link2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar, { type AppView } from "./components/Navbar";
import ProofForm from "./components/ProofForm";
import ProofResult from "./components/ProofResult";
import VerifyProof from "./components/VerifyProof";
import type { ProofPassProof } from "./types/proof";

const businessUseCases = [
  "Hackathons",
  "Colleges",
  "DAOs",
  "Job portals",
  "Private communities",
  "Age-restricted platforms",
  "Scholarship platforms",
];

export default function App() {
  const [activeView, setActiveView] = useState<AppView>("home");
  const [proof, setProof] = useState<ProofPassProof | null>(null);
  const [prefilledVerifierCode, setPrefilledVerifierCode] = useState("");

  const handleChangeView = (view: AppView) => {
    setActiveView(view);

    if (view !== "verify") {
      setPrefilledVerifierCode("");
    }

    if (view !== "create") {
      setProof(null);
    }
  };

  const openVerifierFromProof = (code: string) => {
    setPrefilledVerifierCode(code);
    setActiveView("verify");
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.24),transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.2),transparent_40%)]" />

      <Navbar activeView={activeView} onChangeView={handleChangeView} />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {activeView === "home" && (
          <>
            <Hero onCreate={() => handleChangeView("create")} onVerify={() => handleChangeView("verify")} />

            <section className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                title="Private by design"
                description="Sensitive identity fields stay local. ProofPass never exposes raw records."
                icon={ShieldCheck}
              />
              <FeatureCard
                title="Verifiable proof"
                description="Generate verifier codes and commitment hashes for privacy-safe eligibility checks."
                icon={GraduationCap}
              />
              <FeatureCard
                title="Built for Midnight"
                description="Architecture maps to selective disclosure, private state, and on-chain commitments."
                icon={Building2}
              />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="font-display text-2xl text-white">Business Value</h2>
              <p className="mt-2 text-sm text-slate-300">
                ProofPass can support privacy-preserving onboarding across real ecosystems:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {businessUseCases.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-indigo-300/20 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="font-display text-2xl text-white">Midnight Roadmap Alignment</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-midnight-900/70 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
                    <BadgeCheck size={16} />
                    What this MVP proves now
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    User data stays local, commitments are hashed client-side, and verification reveals only public
                    eligibility outcomes.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-midnight-900/70 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200">
                    <Link2 size={16} />
                    What maps to Midnight next
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Commitments can be anchored on-chain with selective disclosure, private state logic, and issuer
                    attestation workflows.
                  </p>
                </div>
              </div>
            </section>

            <HowItWorks />
          </>
        )}

        {activeView === "create" && (
          <>
            <ProofForm onProofGenerated={setProof} />
            {proof && (
              <ProofResult
                proof={proof}
                onGoToVerifier={openVerifierFromProof}
                onGenerateAnother={() => setProof(null)}
              />
            )}
          </>
        )}

        {activeView === "verify" && <VerifyProof initialCode={prefilledVerifierCode} />}

        {activeView === "how" && <HowItWorks />}
      </main>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </div>
  );
}
