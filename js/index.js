const Vue = require('vue');
const generate = require('./generate.js');

// Generate a random chord
const possibleScaleDegrees = [1,2,3,4,5,6,7];
function newChord() {
    return generate.randomDiatonicChordFromMajorKey(possibleScaleDegrees);
}

const firstChord = newChord();

// Define app
const vm = new Vue({
    el: '#app',
    data: {
        chord: firstChord,
        scaleDegree: firstChord.scaleDegree,
        correctKey: firstChord.key,
        enteredKey: '',
        
    },
    watch: {
        enteredKey: function(key) {
            // Correct formatting of entered key
            if (key.length == 1) {
                this.enteredKey = key.toUpperCase();
            } else {
                const head = key.charAt(0);
                const tail = key.slice(1);
                this.enteredKey = head.toUpperCase() + tail.toLowerCase();
            }
        }
    },
    methods: {
        enter: function() {
            // Check if entered key is correct
            if (this.enteredKey == this.correctKey) {
                // Show new chord
                this.chord = newChord();
                this.scaleDegree = this.chord.scaleDegree;
                this.correctKey = this.chord.key;

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
        }
    }
});