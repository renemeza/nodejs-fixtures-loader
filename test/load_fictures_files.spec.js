var expect = require('chai').expect,
    loadFixturesUtils = require('../lib/utils');

describe('Cargar Archivos Fixtures', function() {
    it('puede cargar un archivo .json', function() {
        loadFixturesUtils.loadFixturesFile(__dirname + '/fixtures/colors.json', function (err, colors) {
            expect(err).to.be.a('null');
            expect(colors).to.have.length(3);
            expect(colors[0]).to.exist;
            expect(colors[0]).to.have.property('name').to.equal('blue');
        });
    });

    it('puede cargar un directorio', function(done) {
        loadFixturesUtils.loadFixturesDir(__dirname + '/fixtures/', function (err, fixs) {
            expect(err).to.be.a('null');
            expect(fixs).to.have.property('fruits');
            expect(fixs['fruits']).to.have.length(3);
            expect(fixs['fruits'][2]).to.have.property('color').to.equal('apple green');
            done();
        });
    });

    it('lanza un error por tipo de archivo no soportado', function () {
        loadFixturesUtils.loadFixturesFile(__dirname + '/fixtures/colors.txt', function (err, colors) {
            expect(err).to.not.be.a('null');
            expect(err).to.have.property('name').to.equal('FileNotSupportedError');
        });
    });
});