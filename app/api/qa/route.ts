import { NextResponse } from "next/server";
import { z } from "zod";

import rulesData from "../../../data/rules.json";

const BodySchema = z.object({
  question: z.string().min(4).max(800),
  context: z.string().max(4000).optional().default(""),
});

type Rule = {
  id: string;
  title: string;
  if: string;
  then: string;
  jurisdiction?: string;
  effectiveDate?: string;
  sourceUrl?: string;
  evidenceNotes?: string;
  tags?: string[];
};

function getRules(): Rule[] {
  const anyData = rulesData as unknown as { rules?: Rule[] };
  return Array.isArray(anyData.rules) ? anyData.rules : [];
}

// Very lightweight rate limiting (best-effort; serverless instances are ephemeral)
const bucket = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const cur = bucket.get(key);
  if (!cur || now > cur.resetAt) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (cur.count >= limit) return { allowed: false, remaining: 0 };
  cur.count += 1;
  return { allowed: true, remaining: Math.max(0, limit - cur.count) };
}

async function callOpenAI({
  question,
  context,
  rules,
}: {
  question: string;
  context: string;
  rules: Rule[];
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      ok: true as const,
      answer:
        "OpenAI is not configured yet. Add OPENAI_API_KEY to your environment to enable live answers.\n\nIn the meantime, this playground shows how we would combine your question with a structured ruleset and return an auditable trace.",
      trace: rules.slice(0, 3).map((r) => ({
        ruleId: r.id,
        note: r.title,
        sourceUrl: r.sourceUrl || undefined,
      })),
    };
  }

  const rulesSnippet = rules
    .slice(0, 24)
    .map(
      (r) =>
        `- [${r.id}] ${r.title}\n  IF: ${r.if}\n  THEN: ${r.then}${
          r.sourceUrl ? `\n  SOURCE: ${r.sourceUrl}` : ""
        }`,
    )
    .join("\n");

  const input = [
    {
      role: "system",
      content:
        "You are ComplianceTwin QA. Answer clearly and concisely. Always include an auditable trace: cite rule IDs you relied on. If the rules are insufficient, say so and suggest what data is missing. Do not fabricate sources.",
    },
    {
      role: "user",
      content: [
        "Question:",
        question.trim(),
        "",
        context.trim() ? "Product context:\n" + context.trim() : "",
        "",
        "Rules (subset):\n" + rulesSnippet,
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ];

  // Use OpenAI Responses API via fetch (no extra SDK dependency)
  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input,
      temperature: 0.2,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    return {
      ok: false as const,
      error: `OpenAI request failed (${resp.status}). ${text}`.slice(0, 2000),
    };
  }

  const json = (await resp.json()) as any;
  const answerText =
    json?.output_text ||
    json?.output?.[0]?.content?.map((c: any) => c?.text).filter(Boolean).join("") ||
    "No answer returned.";

  // Demo trace: try to pick mentioned rule IDs, fall back to first few.
  const ruleIds = rules.map((r) => r.id);
  const mentioned = ruleIds.filter((id) => answerText.includes(id)).slice(0, 6);
  const traceIds = mentioned.length ? mentioned : ruleIds.slice(0, 3);

  return {
    ok: true as const,
    answer: String(answerText).trim(),
    trace: traceIds.map((id) => {
      const r = rules.find((x) => x.id === id);
      return { ruleId: id, note: r?.title, sourceUrl: r?.sourceUrl };
    }),
  };
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = rateLimit(ip, 20, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded. Try again in a minute." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const rules = getRules();
  const { question, context } = parsed.data;
  const result = await callOpenAI({ question, context, rules });

  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

