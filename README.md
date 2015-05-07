# kicad-netlist-to-json.js

Converts KiCad netlist files to JSON.

First, `npm install kicad-netlist-to-json`

Then let's take a KiCad netlist file like [uhk-left-main.net](test/uhk-left-main.net) and...

```
var fs = require('fs');
var kicadNetlistToJson = require('kicad-netlist-to-json');
var kicadNetlist = fs.readFileSync('test/uhk-left-main.net', {encoding:'utf8'});
console.log(JSON.stringify(kicadNetlistToJson(kicadNetlist), null, 4));
```

This way you'll end up with [uhk-left-main.json](test/uhk-left-main.json)
