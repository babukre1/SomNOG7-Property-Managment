import { S3Client } from "@aws-sdk/client-s3";

const requiredVariables = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
];

export const assertR2Configured = () => {
  const missing = requiredVariables.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Missing R2 configuration: ${missing.join(", ")}`);

  if (process.env.R2_ACCESS_KEY_ID.startsWith("cfat_") || process.env.R2_ACCESS_KEY_ID.length !== 32) {
    throw new Error("R2_ACCESS_KEY_ID must be the 32-character S3 Access Key ID, not a cfat_ API token");
  }
};

let client;

export const getR2Client = () => {
  assertR2Configured();
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      // R2 does not require the SDK's automatic CRC32 checksum for presigned PUTs.
      // Disabling it prevents the URL from signing a checksum for an empty body.
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
  }
  return client;
};
