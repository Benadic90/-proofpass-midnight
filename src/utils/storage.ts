import type { ProofPassProof } from "../types/proof";

const STORAGE_KEY = "proofpass.proofs.v1";

function canUseLocalStorage(): boolean {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

function isProofPassProof(value: unknown): value is ProofPassProof {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ProofPassProof>;
  const claims = candidate.publicClaims;
  const parsedTimestamp = Date.parse(String(candidate.timestamp ?? ""));

  // Defensive schema check: only accept entries that match our public proof contract.
  return (
    typeof candidate.proofId === "string" &&
    typeof candidate.verifierCode === "string" &&
    typeof candidate.proofHash === "string" &&
    typeof candidate.timestamp === "string" &&
    Number.isFinite(parsedTimestamp) &&
    typeof candidate.privacyStatus === "string" &&
    candidate.rawDataHidden === true &&
    !!claims &&
    typeof claims.isStudent === "boolean" &&
    typeof claims.isAdult === "boolean" &&
    typeof claims.institutionVerified === "boolean" &&
    Array.isArray(claims.selectedClaims) &&
    claims.selectedClaims.every((claim) => typeof claim === "string")
  );
}

export function getAllProofs(): ProofPassProof[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return [];
  }

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validProofs = parsed.filter(isProofPassProof);
    const seenKeys = new Set<string>();

    return validProofs
      .filter((proof) => {
        // Deduplicate corrupted/repeated entries while preserving first-seen order.
        const key = `${proof.proofId}:${proof.verifierCode}`;
        if (seenKeys.has(key)) {
          return false;
        }
        seenKeys.add(key);
        return true;
      })
      // Show newest proofs first so verifier shortcuts feel instant after generation.
      .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime());
  } catch {
    return [];
  }
}

export function saveProof(proof: ProofPassProof): void {
  if (!canUseLocalStorage()) {
    return;
  }

  const existing = getAllProofs();
  // Replace same proofId if re-saved and keep only the latest 100 proofs in this browser.
  const next = [proof, ...existing.filter((item) => item.proofId !== proof.proofId)].slice(0, 100);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage write failures in strict/private browser environments.
  }
}

export function findProofByVerifierCode(code: string): ProofPassProof | null {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return null;
  }

  return getAllProofs().find((proof) => proof.verifierCode.toUpperCase() === normalized) ?? null;
}
