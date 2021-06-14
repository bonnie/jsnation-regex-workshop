const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// Return true if the input string contains a word starting with
// q (case insensitive), false otherwise
const hasQWord = (inputString) => {
  const regex = /\bq\w+\b/i;
  return regex.test(inputString);
};
assert(hasQWord("I adore quails.") === true);
assert(hasQWord("Quinn left her job! No way!") === true);
assert(hasQWord("This exquisite string has no matching words.") === false);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// Return the first full word of the input string. Could be preceded or
// followed by a space, newline, punctuation, etc.
const findFirstWord = (inputString) => {
  const regex = /^\W*(\w+)\b/;
  // [1] returns the first group
  return regex.exec(inputString)[1];
};
assert.strictEqual(
  findFirstWord("I, a JavaScript fan, am at the JSNation regex workshop!"),
  "I"
);
assert.strictEqual(
  findFirstWord("\nWhat is that newline doing there?\n"),
  "What"
);
