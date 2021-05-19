#!/usr/bin/env node
"use strict";

const {join} = require("path");
const {load} = require("js-yaml");
const {readFileSync, writeFileSync} = require("fs");

const input = join(__dirname, ".eslintrc"); /* eslint-disable-line no-restricted-globals */
const output = join(__dirname, "index.json"); /* eslint-disable-line no-restricted-globals */

writeFileSync(output, JSON.stringify(load(readFileSync(input, "utf8")), null, 2));
