# Cloudflare R2 setup

The application stores property evidence and owner ID documents in a private R2 bucket. Browsers upload through a 10-minute presigned URL, while downloads are proxied through `/api/uploads/file` so the bucket does not need to be public.

## Required backend environment variables

```text
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=banadir-property-documents
```

Add these to `backend/.env` locally and to the backend Vercel project's Production, Preview, and Development environments as appropriate. Never add the real secrets to Git or to frontend environment variables.

## Bucket CORS policy

Because the browser uploads directly to the presigned R2 URL, configure this policy under R2 > bucket > Settings > CORS:

```json
[
  {
    "AllowedOrigins": [
      "https://property.abubakr.so",
      "http://localhost:5173"
    ],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Keep the bucket private. The API token should have Object Read & Write permission scoped only to this bucket.
