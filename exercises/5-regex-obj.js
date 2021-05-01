const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// Write a function that creates a regular expression that checks for
// every instance of the input string surrounded by word boundaries (\b)
const myFavoriteStringRegex = (favoriteString) => {
  // write the function here
};

// assert has trouble comparing regexes; hence the "toString()"
assert.strictEqual(
  myFavoriteStringRegex("regex").toString(),
  /\bregex\b/g.toString()
);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// Return the input regular expression with the 'm' flag removed.
// If there is no 'm' flag, just return the regular expression unaltered.
const removeMultilineFlag = (inputRegex) => {
  // write the function here
};

// assert has trouble comparing regexes; hence the "toString()"
assert.strictEqual(removeMultilineFlag(/^a+/m).toString(), /^a+/.toString());
assert.strictEqual(removeMultilineFlag(/^a+/).toString(), /^a+/.toString());
