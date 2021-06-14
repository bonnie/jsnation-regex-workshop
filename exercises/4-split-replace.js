const assert = require("assert");

// Exercise 1 ///////////////////////////////////////////////////////////////////////
// EXAMPLE: Replace any email address (using the simplified regex below)
// with the text "<<redacted>>"
const redactEmails = (text) => {
  const regex = /\b[\w\.]+@[\w\.]+\.[\w]+\b/g;

  // write function here
};

const emailString1 = "not.an.email@fakedomain.com";
assert.strictEqual(redactEmails(emailString1), "<<redacted>>");

const emailString2 =
  "Please send to yoko@microsoft.com, susan@apple.com and melanie@facebook.com. Thanks!";
const redactedString2 =
  "Please send to <<redacted>>, <<redacted>> and <<redacted>>. Thanks!";
assert.strictEqual(redactEmails(emailString2), redactedString2);

const emailString3 = "This string has no emails!!";
assert.strictEqual(redactEmails(emailString3), emailString3);

// Exercise 2 ///////////////////////////////////////////////////////////////////////
// EXAMPLE: Strip off any whitespace characters from the beginning or end of a string,
// but let the spaces in the middle stand.
const stripWhitespace = (inputString) => {
  // you'll have to add groups in the following regex to make this one work
  const regex = /^\s*.*\S\s*$/;

  // write function here
};

const input1 = "   that's some unnecessary whitespace    \n\n";
const output1 = "that's some unnecessary whitespace";
assert.deepEqual(stripWhitespace(input1), output1);

const input2 = '\n"Get to the back of the ship!" Tom said sternly.\n';
const output2 = '"Get to the back of the ship!" Tom said sternly.';
assert.deepEqual(stripWhitespace(input2), output2);

const noOuterSpaceString = "Do not launch me out of the atmosphere please!";
assert.deepEqual(stripWhitespace(noOuterSpaceString), noOuterSpaceString);

// Exercise 3 ///////////////////////////////////////////////////////////////////////
// Remember this one? Return the punchline of the joke, assuming the punchline starts
// after a ? and any number of space characters, this time using string splitting.
const getPunchline = (joke) => {
  const regex = /\?\s*/;

  // write function here
};

const joke1 =
  "What's the difference between Java and JavaScript? Java is like JavaScript the way car is like carpet.";
const punchline1 = "Java is like JavaScript the way car is like carpet.";
assert.deepStrictEqual(getPunchline(joke1), punchline1);

const joke2 =
  "Why do Javascript developers prefer dark mode? Because light attracts bugs.";
const punchline2 = "Because light attracts bugs.";
assert.deepStrictEqual(getPunchline(joke2), punchline2);

// Exercise 4 ///////////////////////////////////////////////////////////////////////
// Capitalize first letter of every word in a string, and lowercase the rest
const toTitleCase = (inputString) => {
  // Note: you can add groups here to make your job easier later ;-)
  const regex = /\b\w\S*\b/g;

  // write function here
};

const title1 = "of mice and MEN";
const outputTitle1 = "Of Mice And Men";
assert.deepEqual(toTitleCase(title1), outputTitle1);

const title2 =
  "knitting with dog hair: better a sweater from a dog you KNOW and LOVE than from a sheep you’ll NEVER meet";
const outputTitle2 =
  "Knitting With Dog Hair: Better A Sweater From A Dog You Know And Love Than From A Sheep You’ll Never Meet";
assert.deepEqual(toTitleCase(title2), outputTitle2);
