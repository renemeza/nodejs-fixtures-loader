var expect = require('chai').expect,
    fixturesLoader = require('../lib/utils');

describe('Cargar fixtures de forma sincrona', function () {
    describe('Modulo de utilidades', function () {

        it('Puede cargar un archivo .json sin opciones', function () {
            var fixtures = fixturesLoader.loadFixturesFileSync(__dirname + '/fixtures/colors.json');
            expect(fixtures).to.have.length(3);
            expect(fixtures[0]).to.have.property('name').to.equal('blue');
        });

        it('Puede cargar un directorio sin opciones', function () {
            var fixtures = fixturesLoader.loadFixturesDirSync(__dirname + '/fixtures/');
            expect(fixtures).to.have.property('fruits');
            expect(fixtures['fruits']).to.have.length(3);
            expect(fixtures['fruits'][0]).to.have.property('name').to.equal('orange');
        });
    });
});