#!/usr/bin/env node
"use strict";

const {join} = require("path");
const {load} = require("js-yaml");
const {readFileSync, writeFileSync} = require("fs");

const input = join(__dirname, ".eslintrc");
const output = join(__dirname, "index.json");

writeFileSync(output, JSON.stringify(load(readFileSync(input, "utf8")), null, 2));
