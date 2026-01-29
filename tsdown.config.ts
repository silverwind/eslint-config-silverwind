import {nodeLib} from "tsdown-config-silverwind";
import {defineConfig} from "tsdown";

export default defineConfig(nodeLib({
  url: import.meta.url,
  shims: true, // needed for __dirname and __filename in use by some plugins
  minify: true,
  treeshake: true, // explicit treeshaking for better optimization
}));
