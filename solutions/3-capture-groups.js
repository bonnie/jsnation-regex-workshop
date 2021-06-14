const assert = require("assert");

// EXERCISE 1 ///////////////////////////////////////////////////////////////////////
// Return true if string has the first word repeated in the string (case insensitive),
// false otherwise
const stringRepeatsFirstWord = (inputString) => {
  // the \b\1\b ensures the repeat is a full word, so 'To' at the beginning
  // *doesn't* match 'too' later in the string.
  const regex = /^(\b\w+\b).*\b\1\b/i;
  return regex.test(inputString);
};

const stringWithBookends = "Which witch is which?";
assert(stringRepeatsFirstWord(stringWithBookends) === true);

const stringWithRepeats = "To know her is to love her";
assert(stringRepeatsFirstWord(stringWithRepeats) === true);

const averageString = "This is just your average string.";
assert(stringRepeatsFirstWord(averageString) === false);

// EXERCISE 2 ///////////////////////////////////////////////////////////////////////
// Given data shaped like this:
// 28may2021 04:55:38 This is a message
// 03jun2021 23:44:01 This is another message
// Extract the month and day as a group named “date”, the year into a group named "year",
// the time as a group named “time” and the message as a group named “message”

const parseLineIntoObj = (logLine) => {
  // you will have to separate this regex into named groups!
  const regex =
    /^(?<date>\d{2}[a-z]{3})(?<year>\d{4}) (?<time>\d{2}:\d{2}:\d{2}) (?<message>.+)$/;
  return logLine.match(regex).groups;
};

const logLine1 = "28may2021 04:55:38 Something happened here";
const result1 = {
  date: "28may",
  year: "2021",
  time: "04:55:38",
  message: "Something happened here",
};
assert.deepEqual(parseLineIntoObj(logLine1), result1);

const logLine2 = "03jun2021 23:44:01 Nothing happened here";
const result2 = {
  date: "03jun",
  year: "2021",
  time: "23:44:01",
  message: "Nothing happened here",
};
assert.deepEqual(parseLineIntoObj(logLine2), result2);
