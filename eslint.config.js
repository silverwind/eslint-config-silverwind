import configs from "./dist/index.js"; // eslint-disable-line import-x/extensions
import {defineConfig} from "eslint/config";

export default defineConfig(...configs);
