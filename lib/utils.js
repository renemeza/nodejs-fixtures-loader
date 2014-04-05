var fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    _ = require('underscore');

exports.loadFixturesFile = function(file, cb) {
    fs.readFile(file, function (err, data) {
        if (err) { cb(err, null); return; }
        try {
            data = parseFile(data.toString(), file);
            cb(null, data);
        }
        catch (e) {
            cb(e, null);
        }
    });
};

exports.loadFixturesFileSync = function(file) {
    var data = fs.readFileSync(file, 'UTF-8');
    return parseFile(data.toString(), file);
};

exports.loadFixturesDirSync = function (dir) {
    var files = fs.readdirSync(dir),
        dataObj = {};

    files.forEach(function (file_name) {
        var fln = path.basename(file_name).split('.').shift(),
            data = fs.readFileSync(dir + file_name, 'UTF-8');
        try {
            dataObj[fln] = parseFile(data.toString(), file_name);
        }
        catch (e) {
            if (e.name === 'FileNotSupportedError' || e.name === 'FileEmptyError');
        }
    });
    return dataObj;
};

exports.loadFixturesDir = function(dir, cb) {

    fs.readdir(dir, function (err, files) {
        if (err) { cb(err, null); return; }
        var count = files.length,
            dataArr = {};
        files.forEach(function  (file_name) {
            var fln = path.basename(file_name).split('.').shift();

            fs.readFile(dir + file_name, function (err, data) {
                if (err) { console.log(err); cb(err, null); return; }
                try {
                    dataArr[fln] = parseFile(data.toString(), file_name);
                }
                catch (e) {
                    if (e.name === 'FileNotSupportedError' || e.name === 'FileEmptyError');
                }
                count--;
                if (count <= 0 ) {
                    cb(null, dataArr);
                    return;
                }
            });
        });
    });
};

var supportedFileFormatt = {
    'json': mime.lookup('json'),
    'yaml': mime.lookup('yaml'),
    'xml': mime.lookup('xml')
};

function parseFile(data, type) {
    if (!data) { throw {name: 'FileEmptyError', message: '¡El archivo esta vacio!'}; }

    type = mime.lookup(type) || supportedFileFormatt['json'];
    var types = _.values(supportedFileFormatt),
        dataRes = {};
    if (types && (_.indexOf(types, type) != -1)) {
        switch (type) {
            case supportedFileFormatt['json']:
            {
                dataRes = JSON.parse(data.toString());
            }
            break;
            case supportedFileFormatt['yaml']:
            {
                dataRes = require('js-yaml').safeLoad(data.toString());
            }
            break;
            case supportedFileFormatt['xml']:
            break;
        }
        return dataRes;
    }
    else { throw {name: 'FileNotSupportedError', message: '¡Tipo no soportado!'}; }
}