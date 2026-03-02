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
