const fs = require("fs");
const assert = require("assert");

// for assertions
let actual, expected, regex, match, matches;

/********************************************************************************/
// LECTURE EXAMPLE 1: RegExp.prototype.test
// Match strings that have any word that start wtih s or S
regex = /\bs\w+\b/i;

/******** TESTS ********/
match = regex.test("She sells seashells by the seashore.");
assert.strictEqual(match, true);

match = regex.test("I do not like cute animals.");
assert.strictEqual(match, false);

/********************************************************************************/
// LECTURE EXAMPLE 2: RegExp.prototype.exec
// Find the first word that starts with s or S
regex = /\bs\w+\b/i;

/******** TESTS ********/
match = regex.exec("She sells seashells by the seashore.");
assert.deepStrictEqual(match[0], "She");

match = regex.exec("No words with that letter here");
assert.strictEqual(match, null);

/********************************************************************************/
// LECTURE EXAMPLE 3: RegExp.prototype.exec with multiple matches
// Find all words that start with s or S
// g is important so while loop won’t hang!
regex = /\bs\w+\b/gi;

/******** TESTS ********/
matches = []; // clear matches from previous tests
while ((match = regex.exec("She sells seashells by the seashore")))
  matches.push(match[0]);
assert.deepStrictEqual(matches, ["She", "sells", "seashells", "seashore"]);

/********************************************************************************/
// LECTURE EXAMPLE 4: RegExp.protoype.exec with groups
// Find filename and extension for some image files
regex = /^(.+)\.(pdf|jpe?g|png)$/gim;

/******** TESTS ********/
matches = []; // clear matches from previous tests
while ((match = regex.exec("kittens.jpeg\npuppies.png")))
  matches.push([match[1], match[2]]);
// example match: [
//   'kittens.jpeg',
//   'kittens',
//   'jpeg',
//   index: 0,
//   input: 'kittens.jpeg\npuppies.pdf\nsquid.txt\nfoals.png',
//   groups: undefined
// ]

//
assert.deepStrictEqual(matches, [
  ["kittens", "jpeg"],
  ["puppies", "png"],
]);

/********************************************************************************/
// LECTURE EXAMPLE 5: String.prototype.match
// Find the first word that starts with s or S
regex = /\bs\w+\b/i;

/******** TESTS ********/
match = "She sells seashells by the seashore".match(regex);
assert.strictEqual(match[0], "She");

match = "No words begin with that letter.".match(regex);
assert.strictEqual(match, null);

/********************************************************************************/
// LECTURE EXAMPLE 6: String.prototype.match with multiple matches
// Find array of words that start with s or S
regex = /\bs\w+\b/gi;

/******** TESTS ********/
match = "She sells seashells by the seashore".match(regex);
assert.deepStrictEqual(match, ["She", "sells", "seashells", "seashore"]);

match = "No words begin with that letter".match(regex);
assert.strictEqual(match, null);

/********************************************************************************/
// LECTURE EXAMPLE 7: String.prototype.match counting matches
// Find number of words that start with s or S

const countSWordsStringMatch = function (string) {
  const sWordRegex = /\bs\w+\b/gi;
  const match = string.match(sWordRegex);
  return match ? match.length : 0;
};

/******** TESTS ********/
assert(countSWordsStringMatch("She sells seashells by the seashore") === 4);
assert(countSWordsStringMatch("No words begin with that letter.") === 0);

/********************************************************************************/
// LECTURE EXAMPLE 8: String.protoype.matchAll with groups
// Find filename and extension for some image files
// NOTE: string.prototype.matchAll supported in Node 12.0.0+

const findFilenameAndExtensionStringMatchAll = function (files) {
  const filenameRegex = /^(.+)\.(pdf|jpe?g|png)$/gim;
  const matches = [...files.matchAll(filenameRegex)];
  return matches.map((match) => [match[1], match[2]]);
  // example match: [
  //   'kittens.jpeg',
  //   'kittens',
  //   'jpeg',
  //   index: 0,
  //   input: 'kittens.jpeg\npuppies.pdf\nsquid.txt\nfoals.png',
  //   groups: undefined  d
  // ]
};

/******** TESTS ********/
const filenames1 = "kittens.jpeg\npuppies.pdf\nsquid.txt\nfoals.png";
const expectedMatches1 = [
  ["kittens", "jpeg"],
  ["puppies", "pdf"],
  ["foals", "png"],
];
assert.deepStrictEqual(
  findFilenameAndExtensionStringMatchAll(filenames1),
  expectedMatches1
);

const filenames2 = "STRAWBERRY_PIE_RECIPE.PDF";
const expectedMatches2 = [["STRAWBERRY_PIE_RECIPE", "PDF"]];
assert.deepStrictEqual(
  findFilenameAndExtensionStringMatchAll(filenames2),
  expectedMatches2
);

assert.deepStrictEqual(
  findFilenameAndExtensionStringMatchAll("file.notapdf"),
  []
);

/********************************************************************************/
// LECTURE EXAMPLE 9: string.prototype.search
// Find index of first substring word that start wtih s or S, or -1 if no match found
const findFirstSWordIndex = function (string) {
  const sWordRegex = /\bs\w+\b/i;
  return string.search(sWordRegex);
};

/******** TESTS ********/
assert(findFirstSWordIndex("They sell seashells by the seashore.") === 5);
assert(findFirstSWordIndex("I do not like cute animals.") === -1);

/********************************************************************************/
// LECTURE EXAMPLE 10: String.prototpye.match referencing group within regex
// Find words that start and end with the same letter, case insensitive

const findBookendWords = function (string) {
  // first letter needs to be captured in a group to reference
  // it later in the regex as the last letter.
  const sameLetterStartEndRegex = /\b(\w)\w*\1\b/gi;
  return string.match(sameLetterStartEndRegex);
};

/******** TESTS ********/
assert.deepStrictEqual(
  findBookendWords("She sells seashells by the seashore"),
  ["sells", "seashells"]
);

assert.deepStrictEqual(findBookendWords("He described the amoeba as a blob."), [
  "described",
  "amoeba",
  "blob",
]);

assert.deepStrictEqual(findBookendWords("Mm, I just love samosas."), [
  "Mm",
  "samosas",
]);

assert.deepStrictEqual(findBookendWords("This is a boring sentence."), null);

/********************************************************************************/
// LECTURE EXAMPLE 11: named groups
// Extract many partial matches with a name for each partial match
// input is Multi-line log string in the default "combined" format of the nginx
//    access log (see https://nginx.org/en/docs/http/ngx_http_log_module.html)
//
//    '$remote_addr - $remote_user [$time_local] '
//    '"$request" $status $body_bytes_sent '
//    '"$http_referer" "$http_user_agent"';

const parseLogLines = function (logString) {
  // a named capture group is represented by (?<name>regex)
  const logLineNamedGroupRegex =
    /^(?<ip>(?:\d\d?\d?\.){3}\d\d?\d?) - [\w-]+ \[(?<day>\d\d?)\/(?<month>\w{3})\/(?<year>\d{4}):(?<time>\d\d:\d\d:\d\d) (?<tzoffset>\+\d{4})] "(?<method>[A-Z]{3,4}) (?<endpoint>[\S]+) (?<protocol>[A-Z\/\d\.]{3,})" (?<statusCode>\d{3})/gm;
  const matches = [...logString.matchAll(logLineNamedGroupRegex)];
  return matches.map((match) => match.groups);
};

/******** TESTS ********/
const logFileContents = fs.readFileSync("files/access.log", "utf8");
const parsedLines = parseLogLines(logFileContents);
const expectedMatch = {
  ip: "156.96.128.174",
  day: "29",
  month: "Sep",
  year: "2020",
  time: "01:46:25",
  tzoffset: "+0000",
  method: "GET",
  endpoint: "/",
  protocol: "HTTP/1.1",
  statusCode: "200",
};
// using deepEqual instead of deepStrictEqual because the regex match.groups has a null prototype
assert.deepStrictEqual(parsedLines[0], expectedMatch);

/********************************************************************************/
// LECTURE EXAMPLE 12: String.prototype.split
// Split on one or more whitespace characters
const splitOnWhitespace = function (string) {
  return string.split(/\s+/);
};

/******** TESTS ********/
assert.deepStrictEqual(splitOnWhitespace("a b   c\t de"), [
  "a",
  "b",
  "c",
  "de",
]);
assert.deepStrictEqual(splitOnWhitespace("no_whitespace"), ["no_whitespace"]);

/********************************************************************************/
// LECTURE EXAMPLE 13: String.prototype.replace
// Replace all words starting with s with the string "s-word"
// NOTE: string.prototype.replace supported in Node 12.0.0+

const replaceSWords = function (string) {
  return string.replace(/\bs\w+\b/gi, "s-word");
};

/******** TESTS ********/
assert.strictEqual(
  replaceSWords("She sells seashells by the seashore"),
  "s-word s-word s-word by the s-word"
);
assert.strictEqual(
  replaceSWords("No words with that letter here!"),
  "No words with that letter here!"
);

/********************************************************************************/
// LECTURE EXAMPLE 14: Shortcut for groups on string.Prototype.replace
// Remove pairs of single or double quotes at the beginning/end of the input string

const quotesRegex = /(['"])(.*)\1/;

// Douglas Adams
const quoteString1 =
  '"If you try and take a cat apart to see how it works, the first thing you have on your hands is a non-working cat."';
const result1 =
  "If you try and take a cat apart to see how it works, the first thing you have on your hands is a non-working cat.";
assert.strictEqual(quoteString1.replace(quotesRegex, "$2"), result1);

// John Lennon
const quoteString2 =
  "'Life is what happens when you're busy making other plans.'";
const result2 = "Life is what happens when you're busy making other plans.";
assert.strictEqual(quoteString2.replace(quotesRegex, "$2"), result2);

const lopsidedQuoteString =
  "\"Never put off till tomorrow what may be done day after tomorrow just as well.'";
assert.strictEqual(
  lopsidedQuoteString.replace(quotesRegex, "$2"),
  lopsidedQuoteString
);

/********************************************************************************/
// LECTURE EXAMPLE 15: String.prototype.replace referencing group within replacement
// Replace words starting with s or S with s-word or S-word respectively
// NOTE: string.prototype.replace supported in Node 12.0.0+
const replaceSWordsMatchingCase = function (string) {
  return string.replace(
    /\b(s)\w+\b/gi,
    (_, first_letter) => `${first_letter}-word`
  );
};

/******** TESTS ********/
assert.strictEqual(
  replaceSWordsMatchingCase("She sells seashells by the seashore"),
  "S-word s-word s-word by the s-word"
);
assert.strictEqual(
  replaceSWordsMatchingCase("No words with that letter here!"),
  "No words with that letter here!"
);

/********************************************************************************/
// LECTURE EXAMPLE 16: Create RegExp from variable
// Create RegExp to capture root filename and extension for files with certain extensions

// extensions will be an array of strings, assuming file has one extension per line
const extensions = fs.readFileSync("files/extensions.txt", "ascii").split("\n");

// filter out any empty strings
const filteredExtensions = extensions.filter((ext) => ext !== "");

// join the strings with '|' for regular expression "or"
const regexExtensions = filteredExtensions.join("|");

// Must escape \ in RegExp argument (hence \\. instead of \.)
// Second argument is flags
const regexFromVariable = RegExp(`(.*)\\.(${regexExtensions})$`, "gm");

/******** TESTS ********/
expected = /(.*)\.(gif|jpg|jpeg|png|pdf)$/gm;
assert.deepStrictEqual(regexFromVariable, expected);

/********************************************************************************/
// LECTURE EXAMPLE 17: RegExp properties
// Add the 'g' flag to an existing regular expression is it's not already there

const addGlobalToRegex = function (regularExpression) {
  // if the global flag is already there, just return the regex
  if (regularExpression.global) return regularExpression;

  // otherwise, add the global flag and return the result
  return RegExp(regularExpression.source, regularExpression.flags + "g");
};

/******** TESTS ********/
actual = addGlobalToRegex(/\b\w+b\b/);
expected = /\b\w+b\b/g;
assert.deepStrictEqual(actual, expected);

actual = addGlobalToRegex(/a+/g);
expected = /a+/g;
assert.deepStrictEqual(actual, expected);

actual = addGlobalToRegex(/[A-Z]/i);
expected = /[A-Z]/gi;
assert.deepStrictEqual(actual, expected);
