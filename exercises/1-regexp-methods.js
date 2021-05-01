const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// Return true if the input string contains a word starting with
// q (case insensitive), false otherwise
const hasQWord = (inputString) => {
  const regex = /\bq\w+\b/i;
  // write function here
};
assert(hasQWord("I adore quails.") === true);
assert(hasQWord("Quinn left her job! No way!") === true);
assert(hasQWord("This exquisite string has no matching words.") === false);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// Return the first full word of the input string. Could be preceded or
// followed by a space, newline, punctuation, etc.
const findFirstWord = (inputString) => {
  const regex = /^\W*\w+\b/;
  // write funtion here
};
assert(
  findFirstWord("I, a JavaScript fan, am at the JSNation regex workshop!"),
  "I"
);
assert(findFirstWord("\nWhat is that newline doing there?\n"), "What");
