// @ts-expect-error
import {forwardRef} from "react"; // eslint-disable-line no-restricted-imports,@typescript-eslint/no-unused-vars
// @ts-expect-error
import {foo} from "./test2"; // eslint-disable-line import-x/extensions
// @ts-expect-error
import type bar from "./test2"; // eslint-disable-line import-x/extensions,@typescript-eslint/no-unused-vars

// @ts-expect-error
let a = 0;
if (foo) { // eslint-disable-line sonarjs/no-all-duplicated-branches
  a = 1;
} else {
  a = 1; // eslint-disable-line @typescript-eslint/no-unused-vars
}

/** ` */ // eslint-disable-line tsdoc/syntax
function logged(_foo: any, _bar: any, _baz: any) {}

// @ts-expect-error
class C { // eslint-disable-line @typescript-eslint/no-unused-vars
  @logged
  method() {}
}

export default true; // eslint-disable-line import-x/no-unused-modules
