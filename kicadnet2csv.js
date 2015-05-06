#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var Parse = require('s-expression');
var isArray = require('is-array');

function objectify(input) {
    if (typeof input === 'string') {
        return input;
    }

//console.log('objectify', typeof input, input);
    var key = input.shift();

    var output = {};
    output[key] = input.length === 1 ? input[0] : input.map(objectify);
    return output;
}

function unnestify(input) {
    if (!isArray()) {
//        return unnestify()
    }
    var output = {};
}

var fileContent = fs.readFileSync(process.argv[2], {encoding:'utf8'});
var parsedNetlist = Parse(fileContent);
var components = parsedNetlist[3];
//components.shift();
//console.log(JSON.stringify(parsedNetlist, null, 4));
console.log(JSON.stringify(objectify(parsedNetlist), null, 4));
