import { Info, Loader2, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import type { ClaimOption, ProofPassProof } from "../types/proof";
import { createProof } from "../utils/proof";
import { saveProof } from "../utils/storage";

interface ProofFormProps {
  onProofGenerated: (proof: ProofPassProof) => void;
}

interface FormState {
  fullName: string;
  age: string;
  institutionName: string;
  studentId: string;
  email: string;
  secretPhrase: string;
}

const claimOptions: ClaimOption[] = ["Student Status", "Age 18+", "Institution Membership"];

const initialState: FormState = {
  fullName: "",
  age: "",
  institutionName: "",
  studentId: "",
  email: "",
  secretPhrase: "",
};

export default function ProofForm({ onProofGenerated }: ProofFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [selected, setSelected] = useState<Record<ClaimOption, boolean>>({
    "Student Status": true,
    "Age 18+": true,
    "Institution Membership": false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedClaims = useMemo(() => claimOptions.filter((claim) => selected[claim]), [selected]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (error) {
      setError(null);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleClaim = (claim: ClaimOption) => {
    setSelected((prev) => ({ ...prev, [claim]: !prev[claim] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    // Validate locally before hashing so we never generate noisy/invalid commitments.
    const age = Number(form.age);
    if (!form.fullName.trim() || !form.institutionName.trim() || !form.studentId.trim() || !form.email.trim()) {
      setError("Fill all required fields before generating a proof.");
      return;
    }

    if (!Number.isFinite(age) || age < 0 || age > 130) {
      setError("Enter a valid age between 0 and 130.");
      return;
    }

    if (form.secretPhrase.trim().length < 6) {
      setError("Use a secret phrase with at least 6 characters.");
      return;
    }

    if (selectedClaims.length === 0) {
      setError("Select at least one claim to prove.");
      return;
    }

    setIsLoading(true);

    try {
      // Only claim selections and a commitment hash leave this step; raw fields are not persisted.
      const proof = await createProof({
        fullName: form.fullName,
        age,
        institutionName: form.institutionName,
        studentId: form.studentId,
        email: form.email,
        secretPhrase: form.secretPhrase,
        selectedClaims,
      });

      saveProof(proof);
      onProofGenerated(proof);
      // Reset form after successful generation to avoid keeping sensitive input on screen.
      setForm(initialState);
    } catch {
      setError("Could not generate proof. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 text-indigo-200">
        <ShieldCheck size={20} />
        <h2 className="font-display text-2xl text-white">Create Proof</h2>
      </div>
      <p className="mb-6 text-sm text-slate-300">
        Private details stay in your browser. Only proof commitments and public verification signals are saved.
      </p>
      <div className="mb-6 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-midnight-900/70 p-3 text-xs text-slate-300">
          <p className="font-semibold text-white">Step 1</p>
          Enter private data locally.
        </div>
        <div className="rounded-xl border border-white/10 bg-midnight-900/70 p-3 text-xs text-slate-300">
          <p className="font-semibold text-white">Step 2</p>
          Select which claims to prove.
        </div>
        <div className="rounded-xl border border-white/10 bg-midnight-900/70 p-3 text-xs text-slate-300">
          <p className="font-semibold text-white">Step 3</p>
          Generate a public proof commitment.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-300">
          Full name
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="e.g., Alex Carter"
            className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          Age
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min={0}
            max={130}
            placeholder="e.g., 22"
            className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          Institution name
          <input
            name="institutionName"
            value={form.institutionName}
            onChange={handleChange}
            required
            placeholder="e.g., Midnight University"
            className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          Student ID
          <input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
            placeholder="e.g., STU-2026-1042"
            className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="e.g., alex@school.edu"
            className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          Secret phrase
          <input
            type="password"
            name="secretPhrase"
            value={form.secretPhrase}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className="w-full rounded-xl border border-white/15 bg-midnight-900/80 px-3 py-2 text-white outline-none transition focus:border-indigo-300"
          />
        </label>

        <div className="md:col-span-2">
          <p className="mb-2 text-sm text-slate-300">Select proof claims</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {claimOptions.map((claim) => (
              <label
                key={claim}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-midnight-900/70 px-3 py-2 text-sm text-slate-200"
              >
                <input
                  type="checkbox"
                  checked={selected[claim]}
                  onChange={() => toggleClaim(claim)}
                  className="h-4 w-4 rounded border-white/20 bg-midnight-900 text-indigo-500"
                />
                {claim}
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Selected:{" "}
            {selectedClaims.length > 0 ? selectedClaims.join(", ") : "No claim selected"}
          </p>
        </div>

        <div className="md:col-span-2 rounded-xl border border-indigo-300/15 bg-indigo-500/10 p-3 text-xs text-indigo-100">
          <p className="inline-flex items-center gap-2 font-semibold">
            <Info size={14} />
            Privacy note
          </p>
          <p className="mt-1">
            Raw fields are only used to compute a browser-local hash commitment. The stored proof object excludes
            full name, student ID, email, and secret phrase.
          </p>
        </div>

        {error && <p className="md:col-span-2 text-sm text-red-400">{error}</p>}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Generate Private Proof
          </button>
        </div>
      </form>
    </section>
  );
}
