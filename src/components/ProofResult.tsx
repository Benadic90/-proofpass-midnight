import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import type { ProofPassProof } from "../types/proof";

interface ProofResultProps {
  proof: ProofPassProof;
  onGoToVerifier: (code: string) => void;
  onGenerateAnother: () => void;
}

function booleanPill(value: boolean): string {
  return value
    ? "rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300"
    : "rounded-full bg-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-300";
}

export default function ProofResult({ proof, onGoToVerifier, onGenerateAnother }: ProofResultProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(proof.verifierCode);
      setCopyStatus("success");
    } catch {
      // Some browser contexts block clipboard access; we surface a manual-copy hint below.
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

  return (
    <section className="animate-fadeIn rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-2 text-emerald-200">
        <CheckCircle2 size={20} />
        <h3 className="font-display text-xl">Proof generated successfully</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
          <p className="text-sm text-slate-400">Verified Student</p>
          <p className={booleanPill(proof.publicClaims.isStudent)}>{String(proof.publicClaims.isStudent)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
          <p className="text-sm text-slate-400">Age 18+</p>
          <p className={booleanPill(proof.publicClaims.isAdult)}>{String(proof.publicClaims.isAdult)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
          <p className="text-sm text-slate-400">Institution Verified</p>
          <p className={booleanPill(proof.publicClaims.institutionVerified)}>{String(proof.publicClaims.institutionVerified)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
          <p className="text-sm text-slate-400">Private data hidden</p>
          <p className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200">Yes</p>
        </div>
      </div>

      <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-midnight-900/60 p-4 text-sm text-slate-200">
        <p><span className="text-slate-400">Proof ID:</span> {proof.proofId}</p>
        <p className="break-all"><span className="text-slate-400">Proof Hash:</span> {proof.proofHash}</p>
        <p><span className="text-slate-400">Verifier Code:</span> {proof.verifierCode}</p>
        <p><span className="text-slate-400">Timestamp:</span> {new Date(proof.timestamp).toLocaleString()}</p>
        <p><span className="text-slate-400">Privacy Status:</span> {proof.privacyStatus}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          <Copy size={16} />
          {copyStatus === "success" ? "Copied" : "Copy verifier code"}
        </button>
        <button
          onClick={() => onGoToVerifier(proof.verifierCode)}
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
        >
          Go to verifier page
        </button>
        <button
          onClick={onGenerateAnother}
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
        >
          Generate another proof
        </button>
      </div>
      {copyStatus === "error" && (
        <p className="mt-3 text-xs text-red-300">
          Clipboard is unavailable in this browser context. Copy the verifier code manually.
        </p>
      )}
    </section>
  );
}
