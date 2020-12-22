#!/usr/bin/env node

var require = require('esm')(module);
require('./src/cli').cli(process.argv);