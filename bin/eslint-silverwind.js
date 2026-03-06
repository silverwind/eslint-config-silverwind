#!/usr/bin/env node
import {execFileSync} from "node:child_process";
import {createHash} from "node:crypto";
import {readFileSync, readdirSync} from "node:fs";
import {join} from "node:path";
import {argv, cwd, versions} from "node:process";

const pwd = cwd();
const configRe = /^eslint\.config\.\w+$/;

let hash = "";
try {
  const h = createHash("sha1");
  for (const file of readdirSync(pwd)) {
    if (configRe.test(file)) {
      h.update(readFileSync(join(pwd, file)));
    }
  }
  for (const lockfile of ["pnpm-lock.yaml", "package-lock.json"]) {
    try {
      h.update(readFileSync(join(pwd, lockfile)));
      break;
    } catch {}
  }
  hash = h.digest("hex").slice(0, 12);
} catch {}

const defaultFlags = [
  "--cache",
  "--cache-location", `node_modules/.cache/eslint/${hash}/`,
  "--cache-strategy", "content",
];

if (Number(versions.node.split(".")[0]) >= 22) {
  defaultFlags.push("--flag", "unstable_native_nodejs_ts_config");
}

try {
  execFileSync("pnpm", ["exec", "eslint", ...defaultFlags, ...argv.slice(2)], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
} catch (err) {
  process.exit(err?.status ?? 1);
}
