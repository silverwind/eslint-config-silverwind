// @ts-expect-error
import foo from "./test"; // eslint-disable-line import-x/extensions,import-x/no-self-import

// @ts-expect-error
let a = 0;
if (foo) { // eslint-disable-line sonarjs/no-all-duplicated-branches
  a = 1;
} else {
  a = 1; // eslint-disable-line @typescript-eslint/no-unused-vars
}

export default true;
