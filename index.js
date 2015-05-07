#!/usr/bin/env node

var Parse = require('s-expression');
var is = require('is-js');
var R = require('ramda');

module.exports = (function() {

    function objectify(input) {
        if (is.string(input)) {
            return input;
        }

        var key = input.shift();

        var output = {};
        output[key] = input.length === 1 ? input[0] : input.map(objectify);
        return output;
    }

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

    function unnestify(input, path) {

        function getNewPath(key) {
            return path + (path ? '.' : '') + key;
        }

        var key;
        input = stringify(input);
        var output = {};

        if (is.string(input)) {
            output = input;
        } else if (is.array(input)) {
            input.forEach(function(obj) {
                if (is.string(obj)) {
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
        if (is.array(input) || is.string(input)) {
            return input;
        }
        var output = '';
        for (var i=0; i in input; i++) {
            output += input[i];
        }
        return output.length > 0 ? output : input;
    }

    return function(kicadNetlist) {
        return unnestify(objectify(Parse(kicadNetlist)));
    }
})();
