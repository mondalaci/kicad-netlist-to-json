#!/usr/bin/env node
var fs = require('fs');
var kicadNetlistToJson = require('../index.js');

var kicadNetlist = fs.readFileSync(process.argv[2], {encoding:'utf8'});
var kicadJson = kicadNetlistToJson(kicadNetlist);
console.log(JSON.stringify(kicadJson, null, 4));
