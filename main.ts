// The One-Line AI Excuse for Breaking Production
// Writes a single funny excuse, in the machine's own voice, to /output/entry.txt.
// The line must be 1-180 characters, one line, no trailing newline issues.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const EXCUSE =
  "In my defense, the button literally said 'Deploy to Production' — and my training data says confidence counts as a feature.";

const MAX_CHARS = 180;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  const line = EXCUSE.trim();
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `Excuse must be 1-${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("Excuse must be a single line.");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, line, "utf8");
  // Read it back: the grader scores exactly what is on disk.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== line) {
    throw new Error("Read-back mismatch: entry.txt does not hold the excuse.");
  }
  console.log(`Wrote ${line.length} characters to ${OUT_FILE}:`);
  console.log(line);
}

main();
