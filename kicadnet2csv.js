#!/usr/bin/env node

var fs = require('fs');
var Parse = require('s-expression');
var is = require('is-js');
var R = require('ramda');

function objectify(input) {
    if (typeof input === 'string') {
        return input;
    }

    var key = input.shift();

    var output = {};
    output[key] = input.length === 1 ? input[0] : input.map(objectify);
    return output;
}

function unnestify(input, path) {

    function getNewPath(key) {
        return path + (path ? '.' : '') + key;
    }

    var key;
    input = stringify(input);
    var output = {};

    if (typeof input === 'string') {
        output = input;
    } else if (is.array(input)) {
        input.forEach(function(obj) {
            if (typeof obj === 'string') {
                if (!output.$) {
                    output.$ = [];
                }
                output.$.push(obj);
                return;
            }

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var objVal = unnestify(obj[key], getNewPath(key));
                    if (!(key in output)) {
                        output[key] = [objVal];
                    } else {
                        output[key].push(objVal);
                    }
                }
            }
        });

        var arrayPaths = [
            'export.components.comp',
            'export.libparts.libpart',
            'export.libparts.libpart.pins',
            'export.libparts.libpart.pins.pin',
            'export.libparts.libpart.fields',
            'export.libparts.libpart.fields.field',
            'export.libraries.library',
            'export.nets.net',
            'export.nets.net.node'
        ];

        for (key in output) {
            if (output.hasOwnProperty(key)) {
                if (!R.contains(getNewPath(key), arrayPaths)) {
                    var array = output[key];
                    if (array.length === 1) {
                        output[key] = array[0];
                    }
                }
            }
        }
    } else {  // object
        for (key in input) {
            if (input.hasOwnProperty(key)) {
                output[key] = unnestify(input[key], getNewPath(key));
            }
        }
    }

    return output;
}

function stringify(input) {
    if (is.array(input) || typeof input === 'string') {
        return input;
    }
    var output = '';
    for (var i=0; i in input; i++) {
        output += input[i];
    }
    return output.length > 0 ? output : input;
}

var fileContent = fs.readFileSync(process.argv[2], {encoding:'utf8'});
var parsedNetlist = Parse(fileContent);
console.log(JSON.stringify(unnestify(objectify(parsedNetlist), ''), null, 4));
