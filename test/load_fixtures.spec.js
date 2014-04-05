var expect = require('chai').expect,
    loadFixtures = require('../index');

describe('Cargar Fixtures', function () {
    it('Puede cargar directorio con archivos .json', function (done) {
        loadFixtures.load(__dirname + '/fixtures/', function (err, fixtures) {
            expect(err).to.be.a('null');
            expect(fixtures).to.have.property('fruits');
            done();
        });
    });

    it('Puede cargar un archivo .json', function (done) {
        loadFixtures.load(__dirname + '/fixtures/colors.json',
            function (err, fixtures) {
            expect(err).to.be.a('null');
            expect(fixtures).to.have.length(3);
            expect(fixtures[0]).to.have.property('name').to.equal('blue');
            done();
        });
    });

    it('puede cargar un archivo .json desde el directorio por defecto', function (done) {
        var opts = {
            defaultDirectoryName: __dirname + '/fixtures'
        };

        loadFixtures.load('colors.json', opts, function (err, file) {
            expect(err).to.be.a('null');
            expect(file).to.have.length(3);
            expect(file[0]).to.have.property('name').to.equal('blue');
            done();
        });
    });

    it('Puede cargar opciones por defecto globalmente', function (done) {
        loadFixtures.set({
            defaultDirectoryName: __dirname + '/fixtures'
        });
        loadFixtures.load('colors.json', function (err, file) {
            expect(err).to.be.a('null');
            expect(file).to.have.length(3);
            expect(file[0]).to.have.property('name').to.equal('blue');
            done();
        });
    });

    it('No agrega propiedades por defecto que no existan ya', function (done) {
        loadFixtures.set({
            defaultDirectoryName: __dirname + '/fixtures',
            foo: true
        });

        var def_opts = loadFixtures.get();
        expect(def_opts).to.have.property('defaultDirectoryName');
        expect(def_opts).to.not.have.property('foo');
        done();
    });
});