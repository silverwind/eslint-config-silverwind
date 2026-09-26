import configs from "./eslint.config.ts";
import {ESLint} from "eslint";
import {spawnSync} from "node:child_process";
import {execPath} from "node:process";

test("config", () => {
  expect(Array.isArray(configs)).toEqual(true);
});

test("dist loads without pnpm's NODE_PATH", () => {
  const {status, stderr} = spawnSync(execPath, ["--input-type=module", "-e", `await import("./dist/index.js")`], {env: {}, encoding: "utf8"});
  expect({status, stderr}).toEqual({status: 0, stderr: ""});
});

test("lint and format results", async () => {
  const eslint = new ESLint({overrideConfigFile: "./dist/index.js"});
  const results = await eslint.lintText("export {};\n", {filePath: "test.ts"});
  const formatter = await eslint.loadFormatter("json");
  await formatter.format(results);
});

test("require-description reports undescribed oxlint directives", async () => {
  const eslint = new ESLint({overrideConfigFile: "./dist/index.js"});
  const code = "// oxlint-disable-next-line no-debugger\ndebugger;\n// oxlint-disable-next-line no-debugger -- reason\ndebugger;\n";
  const [{messages}] = await eslint.lintText(code, {filePath: "index.test.ts"});
  const ruleId = "@eslint-community/eslint-comments/require-description";
  expect(messages.filter(msg => msg.ruleId === ruleId).map(msg => msg.line)).toEqual([1]);
});

test("wrapper prints spawn errors and exits 1", () => {
  const {status, stderr} = spawnSync(execPath, ["dist/eslint-silverwind.js"], {env: {PATH: ""}, encoding: "utf8"});
  expect({status, stderr}).toEqual({status: 1, stderr: "spawnSync pnpm ENOENT\n"});
});
