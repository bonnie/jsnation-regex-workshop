const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// Return the punchline of the joke, assuming the punchline starts after a ? and any
// number of space characters, using a string method.
// Note: later we will do this same exercise using string splitting.
const getPunchline = (joke) => {
  const regex = /[^\?]\?\s*(.+)/;
  return joke.match(regex)[1];
};

const joke1 =
  "What's the difference between Java and JavaScript? Java is like JavaScript the way car is like carpet.";
const punchline1 = "Java is like JavaScript the way car is like carpet.";
assert.strictEqual(getPunchline(joke1), punchline1);

const joke2 =
  "Why do Javascript developers prefer dark mode? Because light attracts bugs.";
const punchline2 = "Because light attracts bugs.";
assert.strictEqual(getPunchline(joke2), punchline2);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// Return an array of words in the input string that start with the letter j (case
// insensitive) and end with the letter t (also case insensitive).
const getJTwords = (inputString) => {
  const regex = /\bj\w+t\b/gi;
  return inputString.match(regex);
};

const JTstring1 = "JavaScript just makes me jump for joy.";
assert.deepStrictEqual(getJTwords(JTstring1), ["JavaScript", "just"]);

const JTstring2 = "James and Justine went for a walk";
assert.deepStrictEqual(getJTwords(JTstring2), null);

// Exercise 3 ///////////////////////////////////////////////////////////////////////
// Find all of the amounts in USD and return them in an array (hint: use capture groups)
const getUSDamounts = (string) => {
  const regex = /^USD: \$([\d\.]+)/gm;
  const matches = [...string.matchAll(regex)];
  return matches.map((match) => match[1]);
};

const currencyString = `
AUD: $6.09
USD: $5.70
JPY: ¥117.84
EUR: €36.12
USD: $12.89
`;
assert.deepStrictEqual(getUSDamounts(currencyString), ["5.70", "12.89"]);
