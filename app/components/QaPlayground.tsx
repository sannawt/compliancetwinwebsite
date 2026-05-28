"use client";

import { useMemo, useState } from "react";

type QaResponse =
  | {
      ok: true;
      answer: string;
      trace?: Array<{ ruleId: string; note?: string; sourceUrl?: string }>;
    }
  | { ok: false; error: string };

const defaultQuestions = [
  "What is neurosymbolic AI?",
  "How does ComplianceTwin map EU AI Act obligations to product requirements?",
  "What changes did the EU AI Act Omnibus introduce that matter for my product?",
  "How do you keep compliance evidence auditable and up to date?",
] as const;

export function QaPlayground({ compact = false }: { compact?: boolean }) {
  const [question, setQuestion] = useState<string>(defaultQuestions[0]);
  const [context, setContext] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QaResponse | null>(null);

  const canAsk = useMemo(() => question.trim().length > 3, [question]);

  async function onAsk() {
    if (!canAsk || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, context }),
      });
      const json = (await res.json()) as QaResponse;
      setResult(json);
    } catch (e) {
      setResult({
        ok: false,
        error: e instanceof Error ? e.message : "Request failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="win-panel p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold">QA playground</div>
          <div className="text-sm text-black/70">
            A small, playful preview of how we combine symbolic rules with LLM
            interaction.
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {defaultQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuestion(q)}
              className="win-nav-btn"
              aria-pressed={q === question}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm">
            <div className="mb-1 font-semibold">Question</div>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-md border border-black/20 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/30"
              placeholder="Ask about rules, obligations, applicability…"
            />
          </label>

          {!compact ? (
            <label className="text-sm">
              <div className="mb-1 font-semibold">Product context (optional)</div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[96px] w-full resize-y rounded-md border border-black/20 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/30"
                placeholder="e.g. “We provide an AI-powered hiring tool for EU customers…”"
              />
            </label>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onAsk}
              disabled={!canAsk || loading}
              className="win-nav-btn disabled:opacity-60"
            >
              {loading ? "Asking…" : "Ask"}
            </button>
            <div className="text-xs text-black/60">
              Uses a server API route (OpenAI key stays on server).
            </div>
          </div>
        </div>

        {result ? (
          <div className="rounded-md border border-black/10 bg-white/60 p-4">
            {result.ok ? (
              <>
                <div className="text-sm font-semibold">Answer</div>
                <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/80">
                  {result.answer}
                </div>
                {result.trace?.length ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-black/70">
                      Reasoning trace (demo)
                    </div>
                    <ul className="mt-2 list-disc pl-5 text-xs text-black/70">
                      {result.trace.map((t, idx) => (
                        <li key={`${t.ruleId}-${idx}`}>
                          <span className="font-semibold">{t.ruleId}</span>
                          {t.note ? ` — ${t.note}` : ""}
                          {t.sourceUrl ? (
                            <>
                              {" "}
                              <a
                                className="underline"
                                href={t.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                source
                              </a>
                            </>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="text-sm font-semibold">Error</div>
                <div className="mt-2 text-sm text-black/70">{result.error}</div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

