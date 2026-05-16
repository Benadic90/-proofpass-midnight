interface ProofHashInput {
  fullName: string;
  age: number;
  institutionName: string;
  studentId: string;
  email: string;
  secretPhrase: string;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function randomFromAlphabet(length: number, alphabet: string): string {
  if (length <= 0) {
    return "";
  }

  const randomBytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(randomBytes);
  } else {
    for (let index = 0; index < length; index += 1) {
      randomBytes[index] = Math.floor(Math.random() * 256);
    }
  }

  return Array.from(randomBytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

export async function generateProofHash(input: ProofHashInput): Promise<string> {
  // Normalize all user input first so semantically identical values hash to the same commitment.
  const normalizedPayload = {
    commitmentVersion: "proofpass-midnight-v1",
    fullName: normalizeWhitespace(input.fullName),
    age: Math.trunc(input.age),
    institutionName: normalizeWhitespace(input.institutionName),
    studentId: normalizeWhitespace(input.studentId),
    email: input.email.trim().toLowerCase(),
    secretPhrase: normalizeWhitespace(input.secretPhrase),
  };
  const commitment = JSON.stringify(normalizedPayload);

  const encoder = new TextEncoder();
  const encoded = encoder.encode(commitment);
  // Web Crypto returns raw digest bytes; convert to hex for stable storage/transmission.
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(new Uint8Array(digest));
}

export function randomUppercase(length: number): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return randomFromAlphabet(length, alphabet);
}

export function randomAlphaNumeric(length: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  return randomFromAlphabet(length, alphabet);
}
