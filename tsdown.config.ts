import {nodeLib} from "tsdown-config-silverwind";
import {defineConfig} from "tsdown";

export default defineConfig(nodeLib({
  url: import.meta.url,
  entry: ["index.ts", "eslint-silverwind.ts"],
  shims: true, // needed for __dirname and __filename in use by some plugins
  minify: true,
  checks: {pluginTimings: false},
}));
