ComplianceTwin marketing site + QA playground.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Key routes:
- `/`: Landing page (desktop split hero + features + QA preview)
- `/qa`: QA playground page

## Rules data (XLSX → JSON)

1. Copy your spreadsheet into `data/ComplianceCalculatorRules.xlsx`.
2. Convert it to JSON:

```bash
npm run rules:convert
```

This writes `data/rules.json`, which the `/api/qa` endpoint uses.

## OpenAI configuration

The QA playground calls `/api/qa`, which (optionally) calls OpenAI.

Set environment variables:
- `OPENAI_API_KEY` (required for live answers)
- `OPENAI_MODEL` (optional; default: `gpt-4.1-mini`)

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set the environment variables in Vercel Project Settings:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional)
4. Deploy.

Build settings are the defaults for Next.js:
- Build command: `npm run build`
- Output: Next.js

If you update the spreadsheet rules, re-run `npm run rules:convert` and redeploy.
