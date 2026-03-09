#!/usr/bin/env node
import {execFileSync} from "node:child_process";
import {argv, exit, platform} from "node:process";

const args = argv.slice(2);

const eslintArgs = ["exec", "eslint", "--flag", "unstable_native_nodejs_ts_config", ...args];

try {
  execFileSync("pnpm", eslintArgs, {
    stdio: "inherit",
    ...(platform === "win32" && {shell: true}),
  });
} catch (err: unknown) {
  const {status} = err as {status?: number | null};
  if (status === undefined || status === null) {
    console.error(err instanceof Error ? err.message : err);
    exit(1);
  }
  exit(status);
}
