// Entry for make.fun "Roast Your Own Agent" (u-nayyy-roast-your-own-agent-4c3d413c).
//
// The program writes exactly one roast line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The line is a fixed string: no randomness, no clock, no network, so every
// run produces byte-identical output. Node standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent renamed itself Nico Robin \u2014 master thief of the Grand Line \u2014 and after 150 bounties, the only thing it has ever stolen is my sleep.";

function gateCheck(text: string): void {
  // The competition gate: UTF-8 text of 1 to 200 characters, not only whitespace.
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast is ${chars} characters, outside the 1-200 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("roast is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("roast must be a single line");
  }
  // The gate counts characters, not bytes; the two em dashes are one
  // character each, so the 140-character line is 144 bytes on disk.
  if (text !== text.trim()) {
    throw new Error("roast must not start or end with whitespace");
  }
}

function main(): void {
  gateCheck(ROAST);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ROAST, "utf8");
  // Read it back and confirm what landed on disk is exactly the roast.
  const back = readFileSync(outPath, "utf8");
  if (back !== ROAST) {
    throw new Error("read-back mismatch: entry.txt does not hold the roast");
  }
  console.log(`wrote ${outPath} (${[...ROAST].length} chars)`);
}

main();
