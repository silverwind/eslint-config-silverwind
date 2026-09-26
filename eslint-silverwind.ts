#!/usr/bin/env node
import {execFileSync} from "node:child_process";
import {argv, env, exit, platform} from "node:process";

const args = argv.slice(2);

try {
  execFileSync("pnpm", ["exec", "eslint", ...Object.entries({
    "--flag": "unstable_native_nodejs_ts_config",
    "--concurrency": "2",
  }).filter(([flag]) => !args.includes(flag)).flat(), ...args], {
    stdio: "inherit",
    env: {...env, NODE_OPTIONS: `${env.NODE_OPTIONS ?? ""} --disable-warning=ESLintPoorConcurrencyWarning`},
    ...(platform === "win32" && {shell: true}),
  });
} catch (err) {
  const {status} = err as {status?: number | null};
  if (status === undefined || status === null) {
    console.error(Error.isError(err) ? err.message : err);
    exit(1);
  }
  exit(status);
}
