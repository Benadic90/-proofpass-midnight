import { Search, ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ProofPassProof } from "../types/proof";
import { findProofByVerifierCode, getAllProofs } from "../utils/storage";

interface VerifyProofProps {
  initialCode?: string;
}

function statusBadge(value: boolean): string {
  return value
    ? "rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300"
    : "rounded-full bg-slate-700/70 px-3 py-1 text-xs font-semibold text-slate-300";
}

export default function VerifyProof({ initialCode = "" }: VerifyProofProps) {
  const [code, setCode] = useState(initialCode);
  const [proof, setProof] = useState<ProofPassProof | null>(null);
  const [attempted, setAttempted] = useState(false);
  const recentVerifierCodes = useMemo(
    () => getAllProofs().slice(0, 3).map((item) => item.verifierCode),
    []
  );

  const runVerification = (inputCode: string) => {
    // Lookup is case-insensitive and checks only locally stored public proof metadata.
    const match = findProofByVerifierCode(inputCode);
    setAttempted(true);
    setProof(match);
  };

  useEffect(() => {
    setCode(initialCode);
    if (initialCode.trim()) {
      // Supports deep-linking from "Go to verifier page" after proof generation.
      runVerification(initialCode);
    }
  }, [initialCode]);

  const verify = (event: React.FormEvent) => {
    event.preventDefault();
    runVerification(code);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 text-indigo-200">
        <Search size={20} />
        <h2 className="font-display text-2xl text-white">Verify Proof</h2>
      </div>

      <form onSubmit={verify} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(event) => {
            setCode(event.target.value.toUpperCase());
            setProof(null);
            if (attempted) {
              setAttempted(false);
            }
          }}
          placeholder="Enter verifier code (e.g., VERIFY-AB12CD34)"
          className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
        />
        <button
          type="submit"
          className="rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Verify
        </button>
      </form>
      <p className="mt-3 rounded-xl border border-indigo-300/15 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-100">
        Verifier mode is privacy-safe: raw personal data is never displayed on this page.
      </p>
      {recentVerifierCodes.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs text-slate-400">Recent verifier codes in this browser:</p>
          <div className="flex flex-wrap gap-2">
            {recentVerifierCodes.map((recentCode) => (
              <button
                key={recentCode}
                onClick={() => {
                  setCode(recentCode);
                  runVerification(recentCode);
                }}
                className="rounded-full border border-indigo-300/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-100 transition hover:bg-indigo-500/20"
              >
                {recentCode}
              </button>
            ))}
          </div>
        </div>
      )}

      {attempted && !proof && (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-300">
          <div className="mb-1 flex items-center gap-2">
            <ShieldAlert size={18} />
            <p className="font-semibold">Invalid proof code</p>
          </div>
          <p className="text-sm text-red-200">No matching proof was found in local storage.</p>
        </div>
      )}

      {proof && (
        <div className="mt-5 animate-fadeIn rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-5">
          <div className="mb-4 flex items-center gap-2 text-emerald-200">
            <ShieldCheck size={19} />
            <p className="font-display text-lg">Valid Proof: Yes</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
              <p className="text-sm text-slate-400">Student Status</p>
              <p className={statusBadge(proof.publicClaims.isStudent)}>
                {proof.publicClaims.isStudent ? "Verified" : "Not Verified"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
              <p className="text-sm text-slate-400">Age 18+</p>
              <p className={statusBadge(proof.publicClaims.isAdult)}>
                {proof.publicClaims.isAdult ? "Verified" : "Not Verified"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
              <p className="text-sm text-slate-400">Institution Membership</p>
              <p className={statusBadge(proof.publicClaims.institutionVerified)}>
                {proof.publicClaims.institutionVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-midnight-900/60 p-4">
              <p className="text-sm text-slate-400">Private fields</p>
              <p className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200">Hidden</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-midnight-900/60 p-4 text-sm text-slate-200">
            <p><span className="text-slate-400">Proof ID:</span> {proof.proofId}</p>
            <p className="break-all"><span className="text-slate-400">Proof Hash:</span> {proof.proofHash}</p>
            <p><span className="text-slate-400">Timestamp:</span> {new Date(proof.timestamp).toLocaleString()}</p>
            <p><span className="text-slate-400">Verifier Code:</span> {proof.verifierCode}</p>
          </div>
        </div>
      )}
    </section>
  );
}
