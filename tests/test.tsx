// @ts-expect-error
import {forwardRef} from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars -- fixture
// @ts-expect-error
import {foo} from "./test2"; // eslint-disable-line import-x/extensions -- fixture
// @ts-expect-error
import type bar from "./test2"; // eslint-disable-line import-x/extensions,@typescript-eslint/no-unused-vars -- fixture
// @ts-expect-error
import nonexist from "./nonexist"; // eslint-disable-line import-x/extensions,@typescript-eslint/no-unused-vars -- fixture

type Foo = Record<string, any>;
type Bar = Foo & {bar?: string};
// @ts-expect-error
type Baz = Bar & {baz?: string}; // eslint-disable-line @typescript-eslint/no-unused-vars -- fixture

// @ts-expect-error
let a = 0;
if (foo) {
  a = 1;
} else { // eslint-disable-line unicorn/no-duplicate-if-branches -- fixture
  a = 1; // eslint-disable-line @typescript-eslint/no-unused-vars -- fixture
}

function logged(_foo: any, _bar: any, _baz: any) {}

// @ts-expect-error
class C { // eslint-disable-line @typescript-eslint/no-unused-vars -- fixture
  @logged
  method() {}
}

// export default true; // eslint-disable-line import-x/no-unused-modules

["1", "2"].reverse().reduce((p, c) => p + c, ""); // eslint-disable-line unicorn/prefer-array-last-methods -- fixture
Array.from([]).map((t) => t); // eslint-disable-line unicorn/no-unused-array-method-return, unicorn/prefer-array-from-map -- fixture

export const button = <button role="button"/>; // eslint-disable-line jsx-a11y/no-redundant-roles -- fixture

// @ts-expect-error
const _d = document.all; // eslint-disable-line @typescript-eslint/no-deprecated -- fixture
