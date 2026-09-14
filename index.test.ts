import configs from "./eslint.config.ts";
import {ESLint} from "eslint";

test("config", () => {
  expect(Array.isArray(configs)).toEqual(true);
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
