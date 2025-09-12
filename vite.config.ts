import {defineConfig} from "vite";
import {nodeLib} from "vite-config-silverwind";

export default defineConfig(nodeLib({
  url: import.meta.url,
  build: {
    target: "node22",
  },
  dtsExcludes: [
    "test.ts",
    "test2.ts",
  ],
}));
