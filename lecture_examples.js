const fs = require('fs');

// LECTURE EXAMPLE 1: Regular expression literal that matches the first word
// starting with s
const sWordRegex = /\bs\w+\b/;

// LECTURE EXAMPLE 2: Regular expression literal that captures the
// root filename and extension for files that have certain image extensions
const filenameRegex = /^(.+)\.(pdf|jpe?g|png)$/gim;

// LECTURE EXAMPLE 3: Create RegExp from variable
// Create RegExp to capture root filename and extension for files with certain extensions
/**
 * @function findFilesWithImageExtensions
 * Return a regex for files with extensions are specified in input file.
 *
 * Regular expression should have two capturing groups: one for the filename before the
 * final dot, and one for the extension after the dot.
 *
 * Assumes extensionsFilePath is a text file with extensions separated by \n characters.
 *
 * Assumes string of filenames matched against returned regex will have one filenames
 * separated by \n characters.
 *
 * In reality, it's more likely that your function will match a string against the regex
 * rather than just returning the regex, but we haven't gotten to string/regex matching
 * yet in this course! ;-)
 *
 * @param {string} extensionsFilePath
 *
 * @example
 *
 *   findFilesWithImageExtensions('files/extensions.txt')
 *   // => /(.*)\.(gif|jpg|jpeg|png|pdf)$/gm
 *
 * @returns {RegExp} Regular expression object representing filenames with specified extensions
 */
const findFilesWithImageExtensions = function (extensionsFilePath) {
  // extensions will be an array of strings
  const extensions = fs.readFileSync(extensionsFilePath, 'ascii').split('\n');

  // filter out any empty strings
  const filteredExtensions = extensions.filter((ext) => ext !== '');

  // join the strings with '|' for regular expression "or"
  const regexExtensions = filteredExtensions.join('|');

  // Return RegExp. Must escape \ in RegExp argument (hence \\. instead of \.)
  // Second argument is flags
  return RegExp(`(.*)\\.(${regexExtensions})$`, 'gm');
};

// LECTURE EXAMPLE 4: RegExp properties
// Add the 'g' flag to an existing regular expression is it's not already there

/**
 * @function addGlobalToRegex
 * Add the 'g' flag to an existing regular expression is it's not already there
 * 
 * @param {RegExp} regularExpression 
 * 
 * @example
 * 
 *   addGlobalToRegex(/\b\w+b\b/);
 *   // => /\b\w+b\b/g
 * 
 *   addGlobalToRegex(/a+/g);
 *   // => /a+/g
 * 
 *   addGlobalToRegex(/[A-Z]/i);
 *   // => /[A-Z]/gi
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

// LECTURE EXAMPLE JS1: RegExp.prototype.test
// Find strings that have any word that start wtih s or S
/**
 * @function matchStringsWithSWord
 * Return true if input string contains any word that starts with s or S.
 *
 * @param {string} string Input string to be tested
 *
 * @example
 *
 *   matchStringsWithSWord('She sells seashells by the seashore.');
 *   // => true
 *
 *   matchStringsWithSWord('I do not like cute animals.');
 *   // => false
 *
 * @returns {boolean} true if string contains an s-word, false otherwise.
 */
const matchStringsWithSWord = function (string) {
  const sWordRegex = /\bs\w+\b/i;
  return sWordRegex.test(string);
};

// LECTURE EXAMPLE JS2: RegExp.prototype.exec
// Find the first word that starts with s or S
/**
 * @function findFirstSWord
 * Return the first word that starts with s or S.
 *
 * If no word starts with s or S in input string, return null.
 *
 * @example
 *
 *   findFirstSWord('She sells seashells by the seashore')
 *   // => 'She'
 *
 *   findFirstSWord('No words begin with that letter.')
 *   // => null
 *
 * @param {string} string Input string to be matched against
 *
 * @returns {string}  the first match, or null if no match
 */
const findFirstSWord = function (string) {
  const sWordRegex = /\bs\w+\b/i;
  const match = sWordRegex.exec(string);
  // example match: [ 'She', index: 0, input: 'She sells seashells', groups: undefined ]
  // match will be null if no matches found
  return match ? match[0] : null;
};

// LECTURE EXAMPLE JS3: RegExp.prototype.exec with multiple matches
// Find array of words that start with s or S
/**
 * @function findAllSWords
 * Return array of words that start with s or S in the input string
 *
 * If no word starts with s or S in input string, return empty array.
 *
 * @example
 *
 *   findAllSWords('She sells seashells by the seashore')
 *   // => [ 'She', 'sells', 'seashells', 'seashore' ]
 *
 *   findAllSWords('No words begin with that letter.')
 *   // => []
 *
 * @param {string} string Input string to be matched against
 *
 * @returns {array}  array of matched words
 */
const findAllSWords = function (string) {
  const sWordRegex = /\bs\w+\b/gi;
  let match;
  const matches = [];

  // match[0] is the actual match; the rest of the match obj is metadata
  while ((match = sWordRegex.exec(string))) matches.push(match[0]);

  return matches;
};

// LECTURE EXAMPLE JS4: RegExp.protoype.exec with groups
// Find filename and extension for some image files
/**
 * @function findFilenameAndExtension
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
 *   findFilenameAndExtension('kittens.jpeg\npuppies.pdf\nsquid.txt\nfoals.png')
 *   // => [['kittens', 'jpeg'], ['puppies', 'pdf'], ['foals', 'png']]
 *
 *   findFilenameAndExtension('STRAWBERRY_PIE_RECIPE.PDF')
 *   // => [['STRAWBERRY_PIE_RECIPE', 'PDF']]
 *
 *   findFilenameAndExtension('file.notapdf')
 *   // => []
 *
 *   findFilenameAndExtension('kittens.txt')
 *   // => []
 *
 * @returns {array} Array of arrays, of the format [filename, extension]
 */
const findFilenameAndExtension = function (files) {
  const filenameRegex = /^(.+)\.(pdf|jpe?g|png)$/gim;
  let match;
  const matches = [];
  while ((match = filenameRegex.exec(files)))
    matches.push([match[1], match[2]]);
  // example match: [
  //   'kittens.jpeg',
  //   'kittens',
  //   'jpeg',
  //   index: 0,
  //   input: 'kittens.jpeg\npuppies.pdf\nsquid.txt\nfoals.png',
  //   groups: undefined
  // ]
  return matches;
};

// LECTURE EXAMPLE JS5: String.prototype.match
// Find the first word that starts with s or S
/**
 * @function findFirstSWordStringMatch
 * Return the first word that starts with s or S.
 *
 * If no word starts with s or S in input string, return null.
 *
 * @example
 *
 *   findFirstSWordStringMatch('She sells seashells by the seashore')
 *   // => 'She'
 *
 *   findFirstSWordStringMatch('No words begin with that letter.')
 *   // => null
 *
 * @param {string} string Input string to be matched against
 *
 * @returns {string}  the first match, or null if no match
 */
const findFirstSWordStringMatch = function (string) {
  const sWordRegex = /\bs\w+\b/i;
  const match = string.match(sWordRegex);
  // example match: [ 'She', index: 0, input: 'She sells seashells', groups: undefined ]
  // match will be null if no matches found
  return match ? match[0] : null;
};

// LECTURE EXAMPLE JS6: String.prototype.match with multiple matches
// Find array of words that start with s or S
/**
 * @function findAllSWordsStringMatch
 * Return array of words that start with s or S in the input string
 *
 * If no word starts with s or S in input string, return empty array.
 *
 * @example
 *
 *   findAllSWordsStringMatch('She sells seashells by the seashore')
 *   // => [ 'She', 'sells', 'seashells', 'seashore' ]
 *
 *   findAllSWordsStringMatch('No words begin with that letter.')
 *   // => null
 *
 * @param {string} string Input string to be matched against
 *
 * @returns {array}  array of matched words
 */
const findAllSWordsStringMatch = function (string) {
  const sWordRegex = /\bs\w+\b/gi;
  return string.match(sWordRegex);
};

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
 *   // => []
 *
 *   findFilenameAndExtensionStringMatchAll('kittens.txt')
 *   // => []
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

module.exports = {
  matchStringsWithSWord,
  findFirstSWord,
  findAllSWords,
  findFilenameAndExtension,
  findFirstSWordStringMatch,
  findAllSWordsStringMatch,
  countSWordsStringMatch,
  findFilenameAndExtensionStringMatchAll,
  findFirstSWordIndex,
  splitOnWhitespace,
  replaceSWords,
  capitalizeWords,
  replaceSWordsMatchingCase,
  findWordsThatBeginAndEndWithSameLetter,
  parseLogLines,
};
