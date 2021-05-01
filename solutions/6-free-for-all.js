const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// Return all sentences of the string. Ignore space between sentences. Assume a sentence
// ends with . ? or !
const getSentences = (inputString) => {
  const regex = /([^\.\?!]+[\.\?!])\s*/g;
  const matches = inputString.matchAll(regex);
  return [...matches].map((match) => match[1]);
};
const input1 =
  "Some people, when confronted with a problem, think, I know, I'll use regular expressions. Now they have two problems.";
const input1sentence1 =
  "Some people, when confronted with a problem, think, I know, I'll use regular expressions.";
const input1sentence2 = "Now they have two problems.";
assert.deepStrictEqual(getSentences(input1), [
  input1sentence1,
  input1sentence2,
]);

const input2 = "I did it! I found the bug! Now to find the next 99.";
const input2sentences = [
  "I did it!",
  "I found the bug!",
  "Now to find the next 99.",
];
assert.deepStrictEqual(getSentences(input2), input2sentences);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// Given an array of files in a directory, identify which files have a vi swap file (.filename.swp -- for example: .favorite_regexes.txt.swp)
const findFilesWithViSwap = (fileArray) => {
  const regex = /^\.([\w\.]+)\.swp$/;
  return fileArray
    .filter((fileName) => regex.test(fileName))
    .map((fileName) => fileName.replace(regex, "$1"));
};

const directoryFiles = [
  "resume.txt",
  ".resume.txt.swp",
  "cover_letter.txt",
  ".cover_letter.txt.swp",
  "signed_offer_letter.txt",
  "robot_to_reply_to_job_postings.js",
  ".robot_to_reply_to_job_postings.js.swp",
];
assert.deepStrictEqual(findFilesWithViSwap(directoryFiles), [
  "resume.txt",
  "cover_letter.txt",
  "robot_to_reply_to_job_postings.js",
]);

// Exercise 3 ///////////////////////////////////////////////////////////////////////
// Strip html tags out of text
const stripHtmlTags = (inputString) => {
  const regex = /<[^<>]*>/gm;
  return inputString.replace(regex, "");
};

const html1 = "<span>This is a span</span>";
const stripped1 = "This is a span";
assert.strictEqual(stripHtmlTags(html1), stripped1);

const html2 =
  "<h1>Regular Expressions</h1>\n<h2>Quantifiers</h2>\n<p>Quantifiers tell you how many of the preceding token are allowed.</p>";
const stripped2 =
  "Regular Expressions\nQuantifiers\nQuantifiers tell you how many of the preceding token are allowed.";
assert.strictEqual(stripHtmlTags(html2), stripped2);

const html3 = "No tags. Absolutely none.";
assert.strictEqual(stripHtmlTags(html3), html3);

// Exercise 4 ///////////////////////////////////////////////////////////////////////
// Given an input array, return an array only with strings that contain no numbers
const filterOutNumberUsernames = (inputArray) => {
  const regex = /^\D+$/;
  return inputArray.filter((userName) => regex.test(userName));
};

const usernameArray = [
  "githubFan98",
  "loves2code",
  "dadJokesOnly",
  "javascript4ever",
  "son!cTheHedgehog",
];
const filteredUsernameArray = ["dadJokesOnly", "son!cTheHedgehog"];
assert.deepStrictEqual(
  filterOutNumberUsernames(usernameArray),
  filteredUsernameArray
);

// Exercise 5 ///////////////////////////////////////////////////////////////////////
// Make sure the first word of every sentence is capitalized
// For simplicity, you can assume the first word of the string is already capitalized
const capitalizeFirstWordOfSentence = (inputString) => {
  const regex = /([)\.\?\!]\s+)(\w)/gs;
  return inputString.replace(
    regex,
    (_, sentenceEnd, firstLetter) =>
      `${sentenceEnd}${firstLetter.toUpperCase()}`
  );
};

const sentences1 =
  "We are just an advanced breed of monkeys on a minor planet of a very average star. but we can understand the Universe. that makes us something very special. ― Stephen Hawking";
const capitalized1 =
  "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special. ― Stephen Hawking";
assert.strictEqual(capitalizeFirstWordOfSentence(sentences1), capitalized1);

const sentences2 =
  "Why was the JavaScript developer sad? because they didn't Node how to Express themself";
const capitalized2 =
  "Why was the JavaScript developer sad? Because they didn't Node how to Express themself";
assert.strictEqual(capitalizeFirstWordOfSentence(sentences2), capitalized2);
