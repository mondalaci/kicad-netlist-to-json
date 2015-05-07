#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var Parse = require('s-expression');
var isArray = require('is-array');

function objectify(input) {
//    input = stringify(input);
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
    input = stringify(input);
    var output = {};

    if (typeof input === 'string') {
        return input;
    }

    if (isArray(input)) {
        input.forEach(function(obj) {
            if (typeof obj === 'string') {
                if (!output.$) {
                    output.$ = [];
                }
                output.$.push(obj);
                return;
            }

            var counter = 0;
            for (var key in obj) {
                if (!(key in output)) {
                    output[key] = [ unnestify(obj[key]) ];
                } else {
                    output[key].push(unnestify(obj[key]));
                }
                counter++;
                if (counter > 1) {
                    console.log('array: MORE THAN 1 KEY IN AN OBJECT?!:', typeof obj);
                }
            }
        });

        for (var key in output) {
            var array = output[key];
            if (array.length === 1) {
                output[key] = array[0];
            }
        }
    } else {  // object
        var counter = 0;
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                output[key] = unnestify(input[key]);
            }
            if (++counter > 1) {
                console.log('object: MORE THAN 1 KEY IN AN OBJECT?!');
            }
        }
    }

    return output;
}

function stringify(input) {
    if (isArray(input) || typeof input === 'string') {
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
var components = parsedNetlist[3];
//components.shift();
//console.log(JSON.stringify(parsedNetlist, null, 4));
//console.log(JSON.stringify(objectify(parsedNetlist), null, 4));
console.log(JSON.stringify(unnestify(objectify(parsedNetlist)), null, 4));
