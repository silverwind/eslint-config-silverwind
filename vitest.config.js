import {defineConfig} from "vitest/config";
import {backendTest} from "vitest-config-silverwind";
import {stringPlugin} from "vite-string-plugin";

export default defineConfig({
  test: backendTest({
    url: import.meta.url,
  }),
  plugins: [
    stringPlugin(),
  ],
});
