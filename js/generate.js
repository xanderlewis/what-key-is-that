const teoria = require('teoria');

function scaleDegreeChordFromMajorKey(key, scaleDegree) {
    // Get tonic note of key
    const tonic = teoria.note(key);

    // Get scale for key
    const scale = teoria.scale(tonic, 'major');

    // Get root of chord
    const root = scale.notes()[scaleDegree-1];

    // Determine chord quality and return chord
    if ([1,4].includes(scaleDegree)) {
        // Major seventh chord
        return teoria.chord(root, 'maj7');

    } else if ([2,3,6].includes(scaleDegree)) {
        // Minor seventh chord
        return teoria.chord(root, 'min7');

    } else if (scaleDegree == 5) {
        // Dominant seventh chord
        return teoria.chord(root, '7');

    } else if (scaleDegree == 7) {
        // Half-diminished
        return teoria.chord(root, 'm7b5');
    }
}

function randomDiatonicChordFromMajorKey(scaleDegrees) {
    // Generate random key
    const keys = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];
    const key = keys[Math.floor(Math.random() * keys.length)];

    // Generate scale degree from given possible scale degrees
    const scaleDegree = scaleDegrees[Math.floor(Math.random() * scaleDegrees.length)];

    // Generate chord
    const chord = scaleDegreeChordFromMajorKey(key, scaleDegree);

    // Set additional properties on object
    chord.key = key;
    chord.scaleDegree = scaleDegree;

    // Return chord
    return chord;
}

module.exports = {
    scaleDegreeChordFromMajorKey,
    randomDiatonicChordFromMajorKey
};