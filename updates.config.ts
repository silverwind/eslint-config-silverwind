import {base} from "updates-config-silverwind";

export default base({
  url: import.meta.url,
  pin: {
    "@vitest/eslint-plugin": "1.6.20", // 1.6.21 changed vitest/valid-expect for Chai-style expect chains
  },
});

