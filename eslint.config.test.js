import confs from "./eslint.config.js";
import confs2 from "eslint-config-silverwind/flat"; // eslint-disable-line i/no-unresolved
import eslintrc from "./index.json";
import eslintrc2 from "eslint-config-silverwind";

test("confs", () => {
  for (const c of [confs, confs2]) {
    expect(Array.isArray(c)).toEqual(true);
    for (const conf of c) {
      expect(Array.isArray(conf.files)).toEqual(true);
    }
  }
});

test("eslintrc", () => {
  expect(Array.isArray(eslintrc.plugins)).toEqual(true);
  expect(Array.isArray(eslintrc2.plugins)).toEqual(true);
});
