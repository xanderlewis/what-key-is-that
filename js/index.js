const Vue = require('vue');
const generate = require('./generate.js');

// Generate a random chord
const initialScaleDegreesEnabled = [1,2,3,4,5,6,7];
const possibleKeys = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];

const firstChord = generate.randomDiatonicChordFromMajorKey(initialScaleDegreesEnabled);

// Define app
const vm = new Vue({
    el: '#app',
    data: {
        chord: firstChord,
        scaleDegree: firstChord.scaleDegree,
        correctKey: firstChord.key,
        enteredKey: '',
        scaleDegreesEnabled: initialScaleDegreesEnabled,
    },
    watch: {
        enteredKey: function(key) {
            // Correct formatting of entered key
            if (key.length == 1) {
                if (possibleKeys.includes(key.toUpperCase())) {
                    this.enteredKey = key.toUpperCase();
                } else {
                    this.enteredKey = '';
                }
            } else if (!(key.charAt(1) == '#' || key.charAt(1) == 'b')) {
                this.enteredKey = this.enteredKey.slice(0, 1);
            }
        }
    },
    methods: {
        enter: function() {
            // Check if entered key is correct
            if (this.enteredKey == this.correctKey) {
                // Show new chord
                this.newChord();

                // Clear entered key
                this.enteredKey = '';
            }
        },
        romanise: function(num) {
            if (!+num)
                return NaN;
            var digits = String(+num).split(''),
                key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
                    '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
                    '','I','II','III','IV','V','VI','VII','VIII','IX'],
                roman = '',
                i = 3;
            while (i--)
                roman = (key[+digits.pop() + (i * 10)] || '') + roman;
            return Array(+digits.join('') + 1).join('M') + roman;
        },
        newChord: function() {
            let generatedName = this.chord.name;
            let generatedChord;
            while (generatedName == this.chord.name) {
                generatedChord = generate.randomDiatonicChordFromMajorKey(this.scaleDegreesEnabled.map(x => Number(x)));
                generatedName = generatedChord.name;
            }
            this.chord = generatedChord;
            this.scaleDegree = this.chord.scaleDegree;
            this.correctKey = this.chord.key;
        }
    }
});