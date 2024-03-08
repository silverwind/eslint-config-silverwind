import confs from "./eslint.config.js";
import eslintrc from "./index.json";

test("confs", () => {
  expect(Array.isArray(confs)).toEqual(true);
  for (const conf of confs) {
    expect(Array.isArray(conf.files)).toEqual(true);
  }
});

test("eslintrc", () => {
  expect(Array.isArray(eslintrc.plugins)).toEqual(true);
});
