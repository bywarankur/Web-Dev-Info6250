const usernames = {};

const userwords = {};

const words = require('./words');

function addUser({ username, sid }) {
    usernames[username] = sid;
}

function checkUser({ username, sid }) {
    if (usernames[username] && usernames[username] === sid) {
        return true;
    } else {
        return false;
    }
}

function countMatches(guess, secret) {
    let matches = 0;
    const letterCount = {};
    for( let letter of secret.toUpperCase() ) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for( let letter of guess.toUpperCase() ) {
        if( letterCount[letter] ) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }    

    return matches;
}

function addUserGuessWord({ username, guess }) {
    const matches = countMatches(guess, userwords[username]['secretWord']);
    const turns = Object.keys(userwords[username]['guessedWords']).length + 1;
    userwords[username]['guessedWords'][guess]=
        {
            matches: matches, 
            turns: turns
        };    
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


function getRandomSecret() {
    const rand = getRandomIntInclusive(0, words.length - 1);
    return words[rand];
}

function startOver(username) {
    const secretWord = getRandomSecret();
    console.log('assign new secret word: ' + secretWord);
    userwords[username] = {
        'secretWord': secretWord,
        'guessedWords': {}
    }
    Object.keys(userwords[username]['guessedWords']).forEach(k => delete userwords[username]['guessedWords'][k])
}



const userinfo = {
    usernames,
    userwords,
    addUser,
    checkUser,
    addUserGuessWord,
    startOver
};

module.exports = userinfo;