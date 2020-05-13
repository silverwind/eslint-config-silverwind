#!/usr/bin/env node
"use strict";

const jsYaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const input = path.join(__dirname, ".eslintrc");
const output = path.join(__dirname, "index.json");

const yaml = jsYaml.safeLoad(fs.readFileSync(input, "utf8"));
fs.writeFileSync(output, JSON.stringify(yaml, null, 2));
