import fs from "node:fs/promises";
import path from "node:path";
import xlsx from "xlsx";

const ROOT = process.cwd();
const inputPath = path.join(ROOT, "data", "ComplianceCalculatorRules.xlsx");
const outputPath = path.join(ROOT, "data", "rules.json");

function toSlugId(value, fallback) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return s || fallback;
}

function pick(obj, keys) {
  for (const k of keys) {
    if (obj[k] != null && String(obj[k]).trim() !== "") return obj[k];
  }
  return undefined;
}

async function main() {
  // Read workbook
  const wb = xlsx.readFile(inputPath, { cellDates: true });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) throw new Error("No sheets found in workbook");
  const sheet = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  const rules = rows.map((r, i) => {
    const id =
      toSlugId(pick(r, ["id", "ID", "ruleId", "RuleId", "Rule ID"]), `rule-${i + 1}`);
    const title = String(
      pick(r, ["title", "Title", "name", "Name", "Rule", "rule"]) ?? id,
    ).trim();
    const ifCond = String(pick(r, ["if", "IF", "condition", "Condition"]) ?? "").trim();
    const thenCond = String(pick(r, ["then", "THEN", "outcome", "Outcome"]) ?? "").trim();
    const jurisdiction = String(
      pick(r, ["jurisdiction", "Jurisdiction", "region", "Region"]) ?? "",
    ).trim();
    const effectiveDate = String(
      pick(r, ["effectiveDate", "EffectiveDate", "Effective Date"]) ?? "",
    ).trim();
    const sourceUrl = String(pick(r, ["sourceUrl", "SourceUrl", "Source URL", "source"]) ?? "").trim();
    const evidenceNotes = String(pick(r, ["evidenceNotes", "EvidenceNotes", "Evidence Notes", "notes"]) ?? "").trim();
    const tagsRaw = String(pick(r, ["tags", "Tags"]) ?? "").trim();

    const tags = tagsRaw
      ? tagsRaw
          .split(/[;,]/g)
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    return {
      id,
      title,
      if: ifCond,
      then: thenCond,
      jurisdiction,
      effectiveDate,
      sourceUrl,
      evidenceNotes,
      tags,
    };
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify({ sheet: sheetName, rules }, null, 2) + "\n");
  console.log(`Wrote ${rules.length} rules to ${path.relative(ROOT, outputPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

