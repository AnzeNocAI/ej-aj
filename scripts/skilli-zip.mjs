#!/usr/bin/env node
// Packs every skill in skilli/ej-aj/skills/<name>/ into public/skilli/<name>.zip for upload to the
// Claude app (Customize, Skills, Upload). The ZIP holds the skill folder itself, as Anthropic
// expects. Run before a PR that changes a skill; the ZIPs are committed like the share images.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';

const SRC = 'skilli/ej-aj/skills';
const OUT = 'public/skilli';
mkdirSync(OUT, { recursive: true });
for (const name of readdirSync(SRC)) {
  if (!existsSync(`${SRC}/${name}/SKILL.md`)) continue;
  const zip = `${process.cwd()}/${OUT}/${name}.zip`;
  rmSync(zip, { force: true });
  // -X drops extra file attributes, -q quiet; __pycache__ and .DS_Store are never shipped.
  execFileSync('zip', ['-r', '-X', '-q', zip, name, '-x', '*/__pycache__/*', '*.DS_Store'], { cwd: SRC });
  console.log(`  ${OUT}/${name}.zip`);
}
