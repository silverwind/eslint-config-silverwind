// @ts-expect-error
let a = 0;
if (true) { // eslint-disable-line sonarjs/no-gratuitous-expressions,sonarjs/no-all-duplicated-branches
  a = 1;
} else {
  a = 1; // eslint-disable-line @typescript-eslint/no-unused-vars
}
