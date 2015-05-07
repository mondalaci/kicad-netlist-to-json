#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var kicadNetlistToJson = require('../index.js');

var programName = path.basename(process.argv[1]);
var kicadNetlistFilename = process.argv[2] || '';

if (kicadNetlistFilename.length === 0) {
    console.error('Usage: %s kicad-netlist-filename', programName);
    return;
}

try {
    fs.statSync(kicadNetlistFilename);
} catch(error) {
    console.error('File does not exists: "%s"', kicadNetlistFilename);
    return;
}

var kicadNetlist = fs.readFileSync(kicadNetlistFilename, {encoding:'utf8'});
var kicadJson = kicadNetlistToJson(kicadNetlist);
console.log(JSON.stringify(kicadJson, null, 4));
