"use strict";

const { match } = require("assert");

/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
  // DO NOT MODIFY
  let string1 = word.toLowerCase();
  let string2 = guess.toLowerCase();

  let count = 0;
  let find = -1;
  for (let i = 0; i < string1.length; i++) {
    find = string2.indexOf(string1.charAt(i));
    if (find > -1) {
      count++;

      string2 = string2.substr(0, find) + string2.substr(find + 1);
    }
  }
  return count;
}

/* YOU MAY MODIFY THE LINES BELOW */

//Test
console.log(compare("ONE", "TWO"));
console.log(compare("TWO", "won"));
console.log(compare("TOO", "TWO"));
console.log(compare("BOO", "TOO"));
