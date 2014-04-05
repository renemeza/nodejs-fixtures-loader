
/*

    var fixtures = FixturesLoader.loadSync('../fixtures/fix.json');
    FixturesLoader.load('fix.json', function (err, fixtures) {
        console.log(fixture)
    });
    FixturesLoader.load('fix.json').done(function(err, fixs) {
        // ...
    });
    console.log(fixtures.length);
    console.log(fixtures[0].username);
*/
var utils = require('./lib/utils.js'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

var defOptions = {
    defaultDirectoryName: process.cwd() + '/test/fixtures'
};

exports.set = function (options) {

    if (options && _.isObject(options)) {
        for (var p in options) {
            if (_.has(defOptions, p)) {
                defOptions[p] = options[p];
            }
        }
    }
};

exports.get = function (opt_name) {
    var opts = _.clone(defOptions);
    if (!opt_name) { return opts; }
    if (!_.has(opts, opt_name)) {
        throw new Error('No existe la propiedad [' + opt_name + ']');
    }
    return opts[opt_name];
};

exports.load = function(fileOrDir, options, callback) {
    if (typeof options == 'function') {
        callback = options;
        options = _.defaults(options, defOptions);
    }

    if (!fileOrDir) { throw new Error("Se require un nombre de archivo o directorio"); }
    if (!callback) {
        // usar deferred
        throw new Error("Se require un callback");
    }
    var fl = options.defaultDirectoryName ? path.join(options.defaultDirectoryName, fileOrDir) : fileOrDir;
    fs.exists(fl, function (exist) {
        if (exist) {
            fs.stat(fl, function (err, stats) {
                if (err) { callback(err, null); return; }

                if (stats.isDirectory()) {
                    utils.loadFixturesDir(fl, callback);
                }
                else if (stats.isFile()) {
                    utils.loadFixturesFile(fl, callback);
                }
            });
        }
        else {
            return callback(new Error("¡El archivo o directorio " + fl + " no existe!"), null);
        }
    });
};

