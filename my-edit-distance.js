/**
 * Created by matka on 25/12/2017.
 */
var insert, remove, update
insert = remove = function(node) { return 1; }
update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; };

// Define two strings.
let stringA = "abcdef";
let stringB = "abdfgh";

// Compute edit distance, mapping, and alignment.
var lev = ed.levenshtein(stringA, stringB, insert, remove, update);
console.log('Levenshtein', lev.distance, lev.pairs(), lev.alignment());