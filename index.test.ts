import configs from "./eslint.config.ts";
import {ESLint} from "eslint";
import {spawnSync} from "node:child_process";
import {execPath} from "node:process";

const eslint = new ESLint({overrideConfigFile: "./dist/index.js"});

test("config", () => {
  expect(Array.isArray(configs)).toEqual(true);
});

test("only js and ts files get a config", async () => {
  const files = ["build.test.sh", "a.stories.mdx", "a.worker.wasm", "integration/data.json", "a.test.ts"];
  const configured = await Promise.all(files.map(async file => (await eslint.calculateConfigForFile(file)) !== undefined));
  expect(configured).toEqual([false, false, false, false, true]);
});

test("dist loads without pnpm's NODE_PATH", () => {
  const {status, stderr} = spawnSync(execPath, ["--input-type=module", "-e", `await import("./dist/index.js")`], {env: {}, encoding: "utf8"});
  expect({status, stderr}).toEqual({status: 0, stderr: ""});
});

test("lint and format results", async () => {
  const formatter = await eslint.loadFormatter("json");
  await formatter.format(await eslint.lintText("export {};\n", {filePath: "test.ts"}));
});

test("require-description reports undescribed oxlint directives", async () => {
  const [{messages}] = await eslint.lintText("// oxlint-disable-next-line no-debugger\ndebugger;\n// oxlint-disable-next-line no-debugger -- reason\ndebugger;\n", {filePath: "index.test.ts"});
  expect(messages.filter(msg => msg.ruleId === "@eslint-community/eslint-comments/require-description").map(msg => msg.line)).toEqual([1]);
});

test("list-spacing reports bracket spacing but not line breaks", async () => {
  const [{messages}] = await eslint.lintText("export const a = { b: [ 1 ] };\nexport const c = [\n  1, 2,\n];\n", {filePath: "index.ts"});
  expect(messages.filter(msg => msg.ruleId === "silverwind/list-spacing").map(msg => msg.line)).toEqual([1, 1, 1, 1]);
});

test("vitest setup files get the test rules", async () => {
  for (const file of ["vitest.setup.ts", "vitest.setup.browser.ts"]) {
    expect((await eslint.calculateConfigForFile(file)).rules["unicorn/no-global-object-property-assignment"]).toEqual([0]);
  }
});

test("wrapper prints spawn errors and exits 1", () => {
  const {status, stderr} = spawnSync(execPath, ["dist/eslint-silverwind.js"], {env: {PATH: ""}, encoding: "utf8"});
  expect({status, stderr}).toEqual({status: 1, stderr: "spawnSync pnpm ENOENT\n"});
});
