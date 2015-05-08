# kicad-netlist-to-json.js

KiCad netlist (.net) to JSON converter.

[![npm module](https://badge.fury.io/js/kicad-netlist-to-json.svg)](https://www.npmjs.org/package/kicad-netlist-to-json)
[![dependencies](https://david-dm.org/mondalaci/kicad-netlist-to-json.svg)](https://david-dm.org/mondalaci/kicad-netlist-to-json)
[![Build Status](https://travis-ci.org/mondalaci/kicad-netlist-to-json.svg?branch=master)](https://travis-ci.org/mondalaci/kicad-netlist-to-json)

# Usage

First, `npm install kicad-netlist-to-json`

Then let's take a KiCad netlist file like [uhk-left-main.net](test/uhk-left-main.net) and

```
var fs = require('fs');
var kicadNetlistToJson = require('kicad-netlist-to-json');
var kicadNetlist = fs.readFileSync(
    'node_modules/kicad-netlist-to-json/test/uhk-left-main.net',
    {encoding:'utf8'});
console.log(JSON.stringify(kicadNetlistToJson(kicadNetlist), null, 4));
```

This way you'll end up with [uhk-left-main.json](test/uhk-left-main.json)
