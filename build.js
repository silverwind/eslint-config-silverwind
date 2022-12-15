import {load} from "js-yaml";
import {readFileSync, writeFileSync} from "node:fs";

const input = new URL(".eslintrc.yaml", import.meta.url);
const output = new URL("index.json", import.meta.url);
writeFileSync(output, JSON.stringify(load(readFileSync(input, "utf8"))));
