const assert = require("assert");

// EXERCISE 1 ///////////////////////////////////////////////////////////////////////
// Return true if string has the first word repeated in the string (case insensitive),
// false otherwise
const stringRepeatsFirstWord = (inputString) => {
  // note, you will have to adjust this regex so that it finds strings that start
  // and end with the same word
  // const regexToFindFirstWord = /^(\b\w+\b)/i;
  //
  // write function here
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
  const regex = /^\d{2}[a-z]{3}\d{4} \d{2}:\d{2}:\d{2} .+$/;

  // write the function here
};

const logLine1 = "28may2021 04:55:38 Something happened here";
const result1 = {
  date: "28may",
  year: "2021",
  time: "04:55:38",
  message: "Something happened here",
};
assert.deepStrictEqual(parseLineIntoObj(logLine1), result1);

const logLine2 = "03jun2021 23:44:01 Nothing happened here";
const result2 = {
  date: "03jun",
  year: "2021",
  time: "23:44:01",
  message: "Nothing happened here",
};
assert.deepStrictEqual(parseLineIntoObj(logLine2), result2);
