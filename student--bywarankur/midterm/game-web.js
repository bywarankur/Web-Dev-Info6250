const userinfo = require("./user-info.js");
const words = require("./words");

const gameWeb = {
  gamePage: function({username, guesses, errormessage}) {
      return `
        <!doctype html>
        <html>
          <head>
          
            <link rel="stylesheet" href="game.css" />
            <title>WORD GUESSING GAME</title>
          </head>
          <body>
          <h1><b>WORD GUESSING GAME</b></h1>

            <div id='game'>
              <div class='welcomeMessage'>
                <p>Hi ${username}! Let's get start to guess the word!</p>
              </div>
              <div class='gameBody'>
                <div class='guess'>
                <div class='guessList'>
                    <p class='title'>The accepted guesses you've made:</p>
                    ${gameWeb.getAllGuessedWords(guesses)}
                </div>
                <div class='guessForm'>
                  <form action="/" method="POST">
                      <input name="guess" value="" placeholder="Enter word to guess" required/>
                      <button type="submit">Submit</button>
                  </form>
                </div>
                </div>
                <div class='validList'>
                    <p class='title'>Valid words to guess:</p>
                    ${gameWeb.getAllValidWords(words)}
                </div>
                <div class='logout'>

                <form action="/logout" method="POST" class="logout">
                      <button type="Submit">Logout</button>
                      </form>
                      </div>
              </div>
              <div class='result'>
                ${gameWeb.showResult(username, guesses, errormessage)}
              </div>

            </div>
          </body>
        </html>
    `;
    },
  
    loginForm: function() {
      return `
      <!doctype html>
        <html>
          <head>
            <title>Game</title>
            <link rel="stylesheet" href="game.css" />
          </head>
          <body>
            <div id='game'>
              <div class='welcomeUser'>
              <p><b> Let the Fun Begin !</b></p>
                <p>Enter Username here</p>
              </div>
              <div class='loginForm'>
                <form action="/login" method="POST">
                
                  <input name="username" value="" placeholder="Enter username" required/>
                  
                  <button type="submit">Submit</button>
                </form>
              </div>
          </div>
          </body>
        </html>
      `;
    },



    getAllGuessedWords: function(guesses) {
      const guessedWords = guesses['guessedWords'];
      if (guessedWords) {
        return `<ul class="wordList">` +
        Object.keys(guessedWords).map( word => `
          <li>
            <div class="word">
              <p>In your #${guessedWords[word]['turns']} turn, word '${word}' matches ${guessedWords[word]['matches']} letters.</p>
            </div>
          </li>
        `).join('') +
        `</ul>`;
      } else {
        return ``;
      }
      
    },

    showResult: function(username, guesses, errormessage) {
      if (errormessage) {
        return `
          <div class="resultMessage">
              <p>${errormessage}</p>
          </div>
        `;
      } else if (Object.keys(guesses['guessedWords']).length === 0) {
        return `
          <div class="resultMessage">
              <p>Waiting for your guess...</p>
          </div>
          `;
      }else {
        const guessedWords = guesses['guessedWords']
        const word = Object.keys(guessedWords)[Object.keys(guessedWords).length - 1];
        const matches = guessedWords[word]['matches'];
        if (word.toLowerCase() != guesses['secretWord']) {
          return `
          <div class="resultMessage">
              <p>Your guess word '${word}' has ${matches} machtes with secret word!</p>
          </div>
        `;
        } else {
          const turns = guessedWords[word]['turns'];
          userinfo.startOver(username);
          return `
            <div class="resultMessage">
                <p>Congrats! You successfully figure out the secret word '${word}' in ${turns} turns! 
                You can start <a href='/'><b> New-Game</b></a>.</p>
            </div>
          `;
        }
      }
    },

    getAllValidWords: function(words) {
      return `<ul class="wordList">` +
      Object.values(words).map( word => `
        <li>
          <div class="word">
            <p>${word}</p>
          </div>
        </li>
      `).join('') +
      `</ul>`;
    },





  

  };
  module.exports = gameWeb;
  