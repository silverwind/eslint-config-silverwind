#!/usr/bin/env node
import {execFileSync} from "node:child_process";
import {createHash} from "node:crypto";
import {readFileSync, readdirSync} from "node:fs";
import {join} from "node:path";
import {argv, cwd, exit, platform} from "node:process";

const pwd = cwd();
const configRe = /^eslint\.config\.\w+$/;

let hash = "";
try {
  const h = createHash("sha1");
  for (const file of readdirSync(pwd).sort()) {
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
} catch (err) {
  console.error("Failed to compute ESLint cache key:", err);
}

const eslintArgs = ["exec", "eslint"];
if (hash) {
  eslintArgs.push(
    "--cache",
    "--cache-location", `node_modules/.cache/eslint/${hash}/`,
    "--cache-strategy", "content",
  );
}
eslintArgs.push("--flag", "unstable_native_nodejs_ts_config", ...argv.slice(2));

try {
  execFileSync(platform === "win32" ? "pnpm.cmd" : "pnpm", eslintArgs, {
    stdio: "inherit",
  });
} catch (err) {
  if (err?.status === undefined || err?.status === null) {
    console.error(err?.message ?? err);
    exit(1);
  }
  exit(err.status);
}
