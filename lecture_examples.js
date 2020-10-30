const fs = require('fs');
const assert = require('assert');

// for assertions
let actual, expected, regex, match, matches;

// common string for matching
const tongueTwister = 'She sells seashells by the seashore';

/********************************************************************************/
// LECTURE EXAMPLE 1: Regular expression literal 
// Match the first word starting with s
const sWordRegexNoFlags = /\bs\w+\b/;

/********************************************************************************/
// LECTURE EXAMPLE 2: Regular expression literal with groups ****************
// capture the root filename and extension for files that have certain image extensions
const filenameRegex = /^(.+)\.(pdf|jpe?g|png)$/gim;

/********************************************************************************/
// LECTURE EXAMPLE 3: Create RegExp from variable 
// Create RegExp to capture root filename and extension for files with certain extensions

// extensions will be an array of strings, assuming file has one extension per line
const extensions = fs.readFileSync('files/extensions.txt', 'ascii').split('\n');

// filter out any empty strings
const filteredExtensions = extensions.filter((ext) => ext !== '');

// join the strings with '|' for regular expression "or"
const regexExtensions = filteredExtensions.join('|');

// Must escape \ in RegExp argument (hence \\. instead of \.)
// Second argument is flags
const regexFromVariable = RegExp(`(.*)\\.(${regexExtensions})$`, 'gm');

/******** TESTS ********/
expected = /(.*)\.(gif|jpg|jpeg|png|pdf)$/gm;
assert.deepStrictEqual(regexFromVariable, expected);

/********************************************************************************/
// LECTURE EXAMPLE 4: RegExp properties 
// Add the 'g' flag to an existing regular expression is it's not already there

/**
 * @function addGlobalToRegex
 * Add the 'g' flag to an existing regular expression is it's not already there
 * 
 * @param {RegExp} regularExpression 
 * 
 * @returns {RegExp} The input regular expression, including the global flag
 * 
 */
const addGlobalToRegex = function(regularExpression) {
  // if the global flag is already there, just return the regex
  if (regularExpression.global) return regularExpression;

  // otherwise, add the global flag and return the result
  return RegExp(regularExpression.source, regularExpression.flags + 'g')
}

/******** TESTS ********/
actual = addGlobalToRegex(/\b\w+b\b/);
expected = /\b\w+b\b/g
assert.deepStrictEqual(actual, expected);

actual = addGlobalToRegex(/a+/g);
expected = /a+/g
assert.deepStrictEqual(actual, expected);

actual = addGlobalToRegex(/[A-Z]/i);
expected = /[A-Z]/gi
assert.deepStrictEqual(actual, expected);


/********************************************************************************/
// LECTURE EXAMPLE 5: RegExp.prototype.test 
// Match strings that have any word that start wtih s or S
regex = /\bs\w+\b/i;

/******** TESTS ********/
match = regex.test('She sells seashells by the seashore.');
assert.strictEqual(match, true);

match = regex.test('I do not like cute animals.');
assert.strictEqual(match, false);

/********************************************************************************/
// LECTURE EXAMPLE 6: RegExp.prototype.exec 
// Find the first word that starts with s or S
regex = /\bs\w+\b/i;

/******** TESTS ********/
match = regex.exec('She sells seashells by the seashore.');
assert.deepStrictEqual(match[0], 'She');

match = regex.exec('No words with that letter here');
assert.strictEqual(match, null);

/********************************************************************************/
// LECTURE EXAMPLE 7: RegExp.prototype.exec with multiple matches 
// Find all words that start with s or S
// g is important so while loop won’t hang!
regex = /\bs\w+\b/gi;  

/******** TESTS ********/
matches = [ ];  // clear matches from previous tests
while (match = regex.exec('She sells seashells by the seashore'))
  matches.push(match[0]);
assert.deepStrictEqual(matches, [ 'She', 'sells', 'seashells', 'seashore' ]);


/********************************************************************************/
// LECTURE EXAMPLE 8: RegExp.protoype.exec with groups 
// Find filename and extension for some image files
regex = /^(.+)\.(pdf|jpe?g|png)$/gim;

/******** TESTS ********/
  matches = [ ];  // clear matches from previous tests
  while ((match = filenameRegex.exec('kittens.jpeg\npuppies.png')))
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
  assert.deepStrictEqual(matches, [ [ 'kittens', 'jpeg' ], [ 'puppies', 'png' ] ])


/********************************************************************************/
// LECTURE EXAMPLE 9: String.prototype.match 
// Find the first word that starts with s or S
regex = /\bs\w+\b/i;

/******** TESTS ********/
match = ('She sells seashells by the seashore').match(regex);
assert.strictEqual(match[0], 'She');

match = ('No words begin with that letter.').match(regex);
assert.strictEqual(match, null);


/********************************************************************************/
// LECTURE EXAMPLE 10: String.prototype.match with multiple matches 
// Find array of words that start with s or S
regex = /\bs\w+\b/gi;

/******** TESTS ********/
match = ('She sells seashells by the seashore').match(regex);
assert.deepStrictEqual(match, [ 'She', 'sells', 'seashells', 'seashore' ]);

match = ('No words begin with that letter').match(regex);
assert.strictEqual(match, null);


/********************************************************************************/
// LECTURE EXAMPLE XXXXXXX: Greedy quantifier vs. Lazy quantifier 
// Find all HTML tags

const findTagsGreedy = /<.+>/g;
const findTagsLazy = /<.+?>/g;
const nestedTags = '<p>I <b>love</b> regex</p>';

/******** TESTS ********/
actual = nestedTags.match(findTagsGreedy);
expected = [ '<p>I <b>love</b> regex</p>' ];
assert.deepStrictEqual(actual, expected);

actual = nestedTags.match(findTagsLazy);
expected = [ '<p>', '<b>', '</b>', '</p>' ];
assert.deepStrictEqual(actual, expected);


/********************************************************************************/
// LECTURE EXAMPLE JS7: String.prototype.match counting matches 
// Find number of words that start with s or S
/**
 * @function countSWordsStringMatch
 * Return count of words that start with s or S in the input string
 *
 * @example
 *
 *   countSWordsStringMatch('She sells seashells by the seashore')
 *   // => 4
 *
 *   countSWordsStringMatch('No words begin with that letter.')
 *   // => 0
 *
 * @param {string} string Input string to be matched against
 *
 * @returns {number}  number of matched words
 */
const countSWordsStringMatch = function (string) {
  const sWordRegex = /\bs\w+\b/gi;
  const match = string.match(sWordRegex);
  return match ? match.length : 0;
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS8: String.protoype.matchAll with groups 
// Find filename and extension for some image files
// NOTE: string.prototype.matchAll supported in Node 12.0.0+
/**
 * @function findFilenameAndExtensionStringMatchAll
 * Return array of [filename, extension] arrays for filenames with these extensions:
 *  pdf
 *  jpeg
 *  jpg
 *  png
 *
 * @param {string} files Filenames from which to extract part before extension
 *                       Each filename must be on its own line.
 *
 * @example
 *   findFilenameAndExtensionStringMatchAll('kittens.jpeg\npuppies.pdf\nsquid.txt\nfoals.png')
 *   // => [['kittens', 'jpeg'], ['puppies', 'pdf'], ['foals', 'png']]
 *
 *   findFilenameAndExtensionStringMatchAll('STRAWBERRY_PIE_RECIPE.PDF')
 *   // => [['STRAWBERRY_PIE_RECIPE', 'PDF']]
 *
 *   findFilenameAndExtensionStringMatchAll('file.notapdf')
 *   // => [ ]
 *
 *   findFilenameAndExtensionStringMatchAll('kittens.txt')
 *   // => [ ]
 *
 * @returns {array} Array of arrays, of the format [filename, extension]
 */
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


/********************************************************************************/
// LECTURE EXAMPLE JS9: string.prototype.search 
// Find index of first substring word that start wtih s or S
/**
 * @function findFirstSWordIndex
 * Return true if input string contains any word that starts with s or S.
 *
 * @param {string} string Input string to be tested
 *
 * @example
 *
 *   findFirstSWordIndex('They sell seashells by the seashore.');
 *   // => 5
 *
 *   findFirstSWordIndex('I do not like cute animals.');
 *   // => -1
 *
 * @returns {number} Index of first s-word, or -1 if none found.
 */
const findFirstSWordIndex = function (string) {
  const sWordRegex = /\bs\w+\b/i;
  return string.search(sWordRegex);
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS10: String.prototype.split 
// Split on one or more whitespace characters
/**
 * @function splitOnWhitespace
 * Split input string on one or more whitespace characters.
 *
 * @param {string} string Input string to be split.
 *
 * @example
 *
 *  splitOnWhitespace('a b   c\t de')
 *  // => ['a', 'b', 'c', 'de']
 *
 *  splitOnWhitespace('no_whitespace')
 *  // => ['no_whitespace']
 *
 * @returns {array} Array of strings after split.
 */
const splitOnWhitespace = function (string) {
  return string.split(/\s+/);
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS11: String.prototype.replace 
// Replace all words starting with s with the string "s-word"
// NOTE: string.prototype.replace supported in Node 12.0.0+
/**
 * @function replaceSWords
 *
 * @param {string} string Input string for replacement
 *
 * @example
 *
 *   replaceSWords('She sells seashells by the seashore'
 *   // => 's-word s-word s-word by the s-word'
 *
 *   replaceSWords('No words with that letter here!'
 *   // => 'No words with that letter here!'
 *
 * @returns {string} String with s words replaced.
 */
const replaceSWords = function (string) {
  return string.replace(/\bs\w+\b/gi, 's-word');
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS12: String.prototype.replace referencing group within replacement 
// Replace words starting with s or S with s-word or S-word respectively
// NOTE: string.prototype.replace supported in Node 12.0.0+
/**
 * @function replaceSWordsMatchingCase
 *
 * @param {string} string Input string for replacement
 *
 * @example
 *
 *   replaceSWordsMatchingCase('She sells seashells by the seashore'
 *   // => 'S-word s-word s-word by the s-word'
 *
 *   replaceSWordsMatchingCase('No words with that letter here!'
 *   // => 'No words with that letter here!'
 *
 * @returns {string} String with s words replaced.
 */
const replaceSWordsMatchingCase = function (string) {
  return string.replace(
    /\b(s)\w+\b/gi,
    (match, first_letter) => `${first_letter}-word`
  );
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS12: String.prototype.replace with function 
// Replace first word with first letter capitalized, the rest lowercase
// NOTE: string.prototype.replace supported in Node 12.0.0+
/**
 * @function capitalizeWords
 * Replace first word with first letter capitalized, the rest lowercase
 *
 * @param {string} string Input string for replacement
 *
 * @example
 *
 *   capitalizeWords('shE sells "SEASHELLS" on the seaSHORE!')
 *   // => 'She Sells "Seashells" On The Seashore!'
 *
 * @returns {string} String with s words replaced.
 */
const capitalizeWords = function (string) {
  return string.replace(/\b\w+\b/g, (fullMatch) => {
    const firstLetter = fullMatch[0];
    const restOfWord = fullMatch.slice(1);
    return `${firstLetter.toUpperCase()}${restOfWord.toLowerCase()}`;
  });
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS14: String.prototpye.match referencing group within regex 
// Find words that start and end with the same letter, case insensitive
/**
 * @function
 * Return an array of words that begin and end with the same letter.
 * The same letter is case-insensitive.
 *
 * @param {string} string Input string to search
 *
 * @example
 *
 *  findWordsThatBeginAndEndWithSameLetter('She sells seashells by the seashore')
 *  // => ['sells', 'seashells']
 *
 *  findWordsThatBeginAndEndWithSameLetter('He described the amoeba as a blob.')
 *  // => ['described', 'amoeba', 'blob']
 *
 *  findWordsThatBeginAndEndWithSameLetter('Mm, I just love samosas.')
 *  // => ['Mm', 'samosas']
 *
 *  findWordsThatBeginAndEndWithSameLetter('This is a boring sentence.')
 *  // => null
 *
 * @returns {array} Array of words that start and end with the same letter.
 */
const findWordsThatBeginAndEndWithSameLetter = function (string) {
  // first letter needs to be captured in a group to reference
  // it later in the regex as the last letter.
  const sameLetterStartEndRegex = /\b(\w)\w*\1\b/gi;
  return string.match(sameLetterStartEndRegex);
};

/******** TESTS ********/


/********************************************************************************/
// LECTURE EXAMPLE JS15: named groups 
// Extract many partial matches with a name for each partial match
/**
 * 
 * @param {string} logString Multi-line log string in the default "combined" format of the nginx
 *    access log (see https://nginx.org/en/docs/http/ngx_http_log_module.html)
 *
 *    '$remote_addr - $remote_user [$time_local] '
 *    '"$request" $status $body_bytes_sent '
 *    '"$http_referer" "$http_user_agent"';
 *
 * @example
 *   const fs = require('fs');
 *   const logFileContents = fs.readFileSync('../data/access.log', 'utf8');
 *   const parsedLines = parseLogLines(logFileContents);
 *   console.log(parsedLines[0]);
 *   // => {'ip': '199.195.254.38', 'day': '29', 'month': 'Sep', 'year': '2020', 'time': '17:32:37', 'tzoffset': '+0000', 'method': 'GET', 'endpoint': '../../proc/', 'protocol': 'HTTP', 'status_code': '400'}
 *
 * @returns {object} Object with properties from named matched groups:
 *      ip
        day
        month
        year
        time
        tzoffset
        method
        endpoint
        protocol
        status_code

 */
const parseLogLines = function (logString) {
  // a named capture group is represented by (?<name>regex)
  const logLineNamedGroupRegex = /^(?<ip>(?:\d\d?\d?\.){3}\d\d?\d?) - [\w-]+ \[(?<day>\d\d?)\/(?<month>\w{3})\/(?<year>\d{4}):(?<time>\d\d:\d\d:\d\d) (?<tzoffset>\+\d{4})] "(?<method>[A-Z]{3,4}) (?<endpoint>[\S]+) (?<protocol>[A-Z\/\d\.]{3,})" (?<statusCode>\d{3})/gm;
  const matches = [...logString.matchAll(logLineNamedGroupRegex)];
  return matches.map((match) => match.groups);
};

