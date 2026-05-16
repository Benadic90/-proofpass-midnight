# ProofPass Demo Script (Under 2 Minutes)

## 0:00 - 0:10 Intro
Hey, I'm Ben, and this is my demo for Midnight Hackathon 2026.

## 0:10 - 0:25 Problem
Most platforms ask for raw identity data even when they only need a yes/no eligibility check.
That creates avoidable privacy risk.

## 0:25 - 0:40 Solution
ProofPass lets users prove claims like student status or age 18+ without revealing personal details.
Verifiers only see public claim outcomes and proof commitments.

## 0:40 - 1:20 Create Proof Flow
On the landing page, the value is immediate: prove eligibility without revealing personal data.

I open Create Proof, enter sample private fields locally, choose claims, and click Generate Private Proof.
The app hashes sensitive input in-browser with SHA-256 and outputs:
- Proof ID
- Verifier code
- Proof hash
- Timestamp
- Public claim booleans

No raw name, student ID, email, or secret phrase is shown in the output.

## 1:20 - 1:40 Verify Flow
I copy the verifier code, open Verify Proof, and run verification.
The verifier view shows only:
- Valid proof status
- Student / age / institution verification results
- Proof hash and timestamp
- Private fields hidden

## 1:40 - 2:00 Why Midnight + Value
ProofPass maps directly to Midnight: private attributes stay off-chain, while commitments and public outcomes can be anchored for verification.

Use cases include hackathons, colleges, DAOs, private communities, scholarship checks, and age-restricted platforms.

That is ProofPass, built for Midnight Hackathon 2026.
