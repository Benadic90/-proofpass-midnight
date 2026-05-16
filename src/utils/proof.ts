import type { ClaimOption, ProofPassProof } from "../types/proof";
import { generateProofHash, randomAlphaNumeric, randomUppercase } from "./crypto";

export interface CreateProofInput {
  fullName: string;
  age: number;
  institutionName: string;
  studentId: string;
  email: string;
  secretPhrase: string;
  selectedClaims: ClaimOption[];
}

export async function createProof(input: CreateProofInput): Promise<ProofPassProof> {
  // Deduplicate claims to keep output deterministic even if UI state sends duplicates.
  const selectedClaims = Array.from(new Set(input.selectedClaims));

  const proofHash = await generateProofHash({
    fullName: input.fullName,
    age: input.age,
    institutionName: input.institutionName,
    studentId: input.studentId,
    email: input.email,
    secretPhrase: input.secretPhrase,
  });

  const isStudentSelected = selectedClaims.includes("Student Status");
  const isAdultSelected = selectedClaims.includes("Age 18+");
  const isInstitutionSelected = selectedClaims.includes("Institution Membership");

  // IDs/codes are random tokens and not derived from private user fields.
  const proofId = `PP-${Date.now()}-${randomAlphaNumeric(10)}`;
  const verifierCode = `VERIFY-${randomUppercase(10)}`;

  return {
    proofId,
    verifierCode,
    proofHash,
    timestamp: new Date().toISOString(),
    publicClaims: {
      isStudent: isStudentSelected && input.studentId.trim().length > 2,
      isAdult: isAdultSelected && input.age >= 18,
      institutionVerified: isInstitutionSelected && input.institutionName.trim().length > 2,
      selectedClaims,
    },
    privacyStatus: "Private data hidden",
    rawDataHidden: true,
  };
}
