# ProofPass Architecture

## 1. Frontend Layer
ProofPass is a React + Vite + TypeScript single-page app styled with Tailwind CSS.

Key modules:
- `src/App.tsx`: view orchestration (Home, Create, Verify, How It Works)
- `src/components/*`: UI sections and flow-specific panels
- `src/utils/*`: proof creation, hashing, and persistence
- `src/types/proof.ts`: shared proof typing

The UI is optimized for demo clarity, mobile responsiveness, and privacy messaging.

## 2. Local Proof Generation
Proof creation runs entirely in the browser.

Input data (private):
- fullName
- age
- institutionName
- studentId
- email
- secretPhrase

User-selected claims:
- Student Status
- Age 18+
- Institution Membership

`createProof()` outputs only public verification data and metadata.

## 3. Hashing and Commitment
`generateProofHash()` in `src/utils/crypto.ts`:
- Normalizes sensitive input fields
- Creates a canonical commitment payload
- Hashes payload with SHA-256 via `crypto.subtle.digest`
- Returns hex commitment string

This hash acts as the privacy-safe commitment anchor.

## 4. Proof Object Model
The app uses `ProofPassProof`:
- `proofId`
- `verifierCode`
- `proofHash`
- `timestamp`
- `publicClaims`
- `privacyStatus`
- `rawDataHidden: true`

Raw personal fields are intentionally excluded from persisted proof objects.

## 5. Storage and Verification
Storage strategy:
- localStorage key: `proofpass.proofs.v1`
- schema validation is applied on read
- malformed entries are ignored safely

Verification strategy:
- Lookup by verifier code
- Display only public claims and commitment metadata
- Never display raw personal fields

## 6. Privacy Design Decisions
- No backend: zero accidental data transmission risk for MVP
- Browser-local hashing before persistence
- Strict public/private output boundary in UI
- Dedicated privacy status field for user trust visibility

## 7. Midnight Integration Path
`contracts/ProofPass.compact` is a commented placeholder that models:
- Commitment registration (`proofId`, `proofHash`, `publicClaims`, `timestamp`)
- Proof verification by commitment

Planned Midnight-native upgrades:
- On-chain commitment registry
- Selective disclosure policies
- Private state logic
- Issuer attestations and revocation checks

## 8. Why This Architecture Fits Hackathon Goals
- **Technology:** client-side commitment workflow + typed architecture
- **Originality:** privacy-first eligibility UX for real onboarding use cases
- **Execution:** complete end-to-end flow with polished interface
- **Completion:** docs, contract placeholder, and demo script included
- **Business value:** clear adoption path across multiple verticals
