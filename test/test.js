#!/usr/bin/env node
var fs = require('fs');
var kicadNetlistToJson = require('../index.js');

var kicadNetlist = fs.readFileSync('test/uhk-left-main.net', {encoding:'utf8'});
var generatedKicadJson = JSON.stringify(kicadNetlistToJson(kicadNetlist), null, 4);
var savedKicadJson = fs.readFileSync('test/uhk-left-main.json', {encoding:'utf8'});
var testResult = generatedKicadJson.trim() === savedKicadJson.trim() ? 'OK' : 'FAIL';
console.log(testResult);
