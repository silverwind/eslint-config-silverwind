import {defineConfig, configDefaults} from "vitest/config";
import {backend} from "vitest-config-silverwind";

export default defineConfig(backend({
  url: import.meta.url,
  test: {
    exclude: [
      ...configDefaults.exclude,
      "tests/**/*",
    ],
  },
}));
