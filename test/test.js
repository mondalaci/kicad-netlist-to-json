#!/usr/bin/env node

var fs = require('fs');
var kicadNetlistToJson = require('../index.js');

var kicadNetlist = fs.readFileSync(__dirname + '/uhk-left-main.net', {encoding:'utf8'});
var generatedKicadJson = JSON.stringify(kicadNetlistToJson(kicadNetlist), null, 4);
var savedKicadJson = fs.readFileSync(__dirname + '/uhk-left-main.json', {encoding:'utf8'});
var statusCode = generatedKicadJson.trim() === savedKicadJson.trim() ? 0 : 1;

console.log(statusCode === 0 ? 'All good.' : 'Test failed!');
process.exit(statusCode);
