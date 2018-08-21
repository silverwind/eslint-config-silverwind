#!/usr/bin/env node
"use strict";

const YAML = require("yamljs");
const fs = require("fs");
const path = require("path");

const input = path.join(__dirname, ".eslintrc");
const output = path.join(__dirname, "index.json");

const config = YAML.parse(String(fs.readFileSync(input)));
fs.writeFileSync(output, JSON.stringify(config));
