import configs, {defineConfig, globalIgnores} from "./eslint.config.ts";
import {ESLint} from "eslint";

test("config", () => {
  expect(Array.isArray(configs)).toEqual(true);
});

test("defineConfig", () => {
  expect(typeof defineConfig).toEqual("function");
  expect(Array.isArray(defineConfig(...configs))).toEqual(true);
});

test("globalIgnores", () => {
  expect(typeof globalIgnores).toEqual("function");
  const result = globalIgnores(["node_modules"]);
  expect(result).toHaveProperty("ignores");
});

test("lint and format results", async () => {
  const eslint = new ESLint({overrideConfigFile: "./dist/index.js"});
  const results = await eslint.lintText("export {};\n", {filePath: "test.ts"});
  const formatter = await eslint.loadFormatter("json");
  await formatter.format(results);
});
