const expect = require('chai').expect;
const generate = require('../js/generate.js');
const teoria = require('teoria');

describe('generate', function() {
    describe('generating a chord given a key and a scale degree', function() {
        it('should generate a chord with name Dmin7 when given the key of C and scale degree 2', function() {
            expect(generate.scaleDegreeChordFromMajorKey('C', 2).name).to.equal(teoria.chord('Dmin7').name);
        });

        it('should generate a chord with name Cmin7 when given the key of Eb and scale degree 6', function() {
            expect(generate.scaleDegreeChordFromMajorKey('Eb', 6).name).to.equal(teoria.chord('Cmin7').name);
        });

        it('should generate a chord with name E#m7b5 when given the key of F# and scale degree 7', function() {
            expect(generate.scaleDegreeChordFromMajorKey('F#', 7).name).to.equal(teoria.chord('E#m7b5').name);
        });

        it('should generate a chord with name Fmaj7 when given the key of C and scale degree 4', function() {
            expect(generate.scaleDegreeChordFromMajorKey('C', 4).name).to.equal(teoria.chord('Fmaj7').name);
        })
    });
});