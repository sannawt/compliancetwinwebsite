type QaItem = {
  q: string;
  a: string;
};

const items: QaItem[] = [
  {
    q: "What is neurosymbolic AI?",
    a: "Neurosymbolic AI combines neural models (good at pattern recognition and language) with symbolic methods (good at explicit logic, rules, and traceability). In ComplianceTwin terms: the LLM helps you interact with the system, while the symbolic layer represents obligations and rule logic in a way that can be audited and updated over time.",
  },
  {
    q: "How does ComplianceTwin map EU AI Act obligations to product requirements?",
    a: "It structures obligations as explicit logic/rule representations and links them to product facts (what the system does, who uses it, where it’s deployed). That produces a compliance record that can be reviewed, updated, and supported with evidence artifacts over time—rather than a one-off checklist.",
  },
  {
    q: "What changes did the EU AI Act Omnibus introduce that matter for my product?",
    a: "This depends heavily on your product category and deployment context. ComplianceTwin’s approach is to track updates as structured changes and highlight deltas that affect scope, classification, obligations, and evidence expectations—so you can re-run applicability and see what changed in your record (and why).",
  },
  {
    q: "How do you keep compliance evidence auditable and up to date?",
    a: "By maintaining a live record that links: obligations → reasoning trace → evidence artifacts (policies, tests, design docs, monitoring reports). When regulations or product facts change, the system flags impacted obligations and workflows so the record stays current and reviewable.",
  },
];

export function QaAccordion() {
  return (
    <div className="ct-section p-6">
      <div className="ct-sectionHeader">
        <div className="ct-eyebrow">QA</div>
        <h1 className="ct-h2">Questions & answers</h1>
        <p className="ct-subtle max-w-2xl">
          A quick overview of the concepts behind ComplianceTwin.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <div key={it.q} className="ct-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="text-base font-semibold leading-6">{it.q}</div>
            </div>
            <div className="mt-4 text-sm leading-6 text-black/70">{it.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

