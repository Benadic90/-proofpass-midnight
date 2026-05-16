export type ClaimOption = "Student Status" | "Age 18+" | "Institution Membership";

export interface ProofPassProof {
  proofId: string;
  verifierCode: string;
  proofHash: string;
  timestamp: string;
  publicClaims: {
    isStudent: boolean;
    isAdult: boolean;
    institutionVerified: boolean;
    selectedClaims: string[];
  };
  privacyStatus: string;
  rawDataHidden: true;
}
