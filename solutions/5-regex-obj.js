const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// Write a function that creates a regular expression that checks for
// every instance of the input string surrounded by word boundaries (\b)
const myFavoriteStringRegex = (favoriteString) => {
  return RegExp(`\\b${favoriteString}\\b`, "g");
};
assert.strictEqual(
  myFavoriteStringRegex("regex").toString(),
  /\bregex\b/g.toString()
);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// Return the input regular expression with the 'm' flag removed.
// If there is no 'm' flag, just return the regular expression unaltered.
const removeMultilineFlag = (inputRegex) => {
  if (!inputRegex.multiline) return inputRegex;
  const flags = inputRegex.flags;
  const flagsWithoutMultiline = flags.replace("m", "");
  return RegExp(inputRegex.source, flagsWithoutMultiline);
};
assert.strictEqual(removeMultilineFlag(/^a+/m).toString(), /^a+/.toString());
assert.strictEqual(removeMultilineFlag(/^a+/).toString(), /^a+/.toString());
