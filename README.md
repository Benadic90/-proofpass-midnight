# ProofPass

**Tagline:** Prove eligibility without revealing personal data.

Built for Midnight Hackathon 2026.

## Problem
Most identity checks are over-collecting data. Platforms asking only "Are you eligible?" still request raw personal details such as full name, student ID, email, or date of birth.

## Solution
ProofPass is a privacy-first verification dApp that returns only public eligibility outcomes and proof commitments.

Verifiers can confirm:
- Student status
- Age 18+
- Institution membership

Verifiers cannot see:
- Full name
- Student ID
- Email
- Secret phrase

## Why This Matters
ProofPass demonstrates a practical privacy UX for real onboarding workflows where only claim-level answers are needed.

## Features
- Browser-local proof generation with no backend
- SHA-256 commitment hashing via Web Crypto API
- Public proof object with:
  - `proofId`
  - `verifierCode`
  - `proofHash`
  - `timestamp`
  - public claim booleans
- localStorage persistence for fast demo verification
- Polished dark-mode UI with mobile-friendly layout
- Midnight smart contract placeholder: `contracts/ProofPass.compact`

## Tech Stack
- React
- Vite
- TypeScript
- Tailwind CSS
- lucide-react
- Web Crypto API
- localStorage

## Privacy Model
1. User enters private inputs in-browser.
2. Inputs are normalized and hashed with SHA-256 into a commitment.
3. App stores only commitment metadata and public claim results.
4. Verifier checks proof by verifier code.
5. Raw personal fields are never shown in verification output.

> ProofPass never reveals your raw personal data. It only shares verification results and proof commitments.

## Midnight Relevance
ProofPass is designed as a Midnight-aligned MVP:
- Private attributes remain off-chain.
- Public commitments are ready to be anchored on-chain.
- Verification logic maps to selective disclosure patterns.
- The included Compact placeholder demonstrates storage and verification flow.

## Business Value
ProofPass can be used by:
- Hackathons
- Colleges
- DAOs
- Job portals
- Private communities
- Age-restricted platforms
- Scholarship platforms

## Quick Start
### Prerequisites
- Node.js 18+
- npm 9+

### Install and run
```bash
npm install
npm run dev
```
If port `5173` is already in use, Vite automatically selects the next available port.

### Build check
```bash
npm run build
```

## Usage Flow
1. Open Home and review privacy guarantee.
2. Go to **Create Proof**.
3. Enter private details and choose claim checkboxes.
4. Click **Generate Private Proof**.
5. Copy verifier code from proof result.
6. Go to **Verify Proof** and paste code.
7. Verify only public claim outcomes and proof commitment.

## Project Structure
```text
proofpass-midnight/
  src/
    components/
    utils/
    types/
  contracts/
    ProofPass.compact
  docs/
    architecture.md
    demo-script.md
```

## Demo-Ready Notes
- No wallet setup needed for MVP demo.
- No backend dependency.
- Proof generation and verification are deterministic and fast.
- Optimized for a <=2 minute hackathon walkthrough.
- Built for Midnight Hackathon 2026.

## Architecture and Script
- [Architecture](docs/architecture.md)
- [2-minute Demo Script](docs/demo-script.md)

## Future Improvements
- Real Midnight smart contract deployment
- Real zero-knowledge proof circuit integration
- Wallet connection
- Decentralized credential issuer
- QR-based verifier flow
- Institution dashboard
- Revocation registry

## Hackathon Submission Notes
- Public repository ready
- Demo narrative ready
- Privacy-first UX complete
- Midnight mapping clearly documented

## Judge Scoring Alignment
- Technology: deterministic client-side proof commitments with typed data model and clean architecture
- Originality: practical privacy-preserving eligibility checks for real onboarding workflows
- Execution: complete create/verify UX with responsive design and modern visual quality
- Completion: includes contract placeholder, architecture doc, demo script, and production build path
- Documentation: step-by-step usage, clear privacy model, and submission-ready narrative
- Business Value: immediately applicable to hackathons, colleges, DAOs, and gated communities
