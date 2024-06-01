import conf from "./index.ts";
import eslintrc from "./index.cjs";

test("confs", () => {
  expect(Array.isArray(conf)).toEqual(true);
  for (const c of conf) {
    expect(Array.isArray(c.files)).toEqual(true);
  }
});

test("eslintrc", () => {
  expect(Array.isArray(eslintrc.plugins)).toEqual(true);
});
