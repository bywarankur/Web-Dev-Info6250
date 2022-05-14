const express = require('express');
const cookieParser = require('cookie-parser');

const userinfo = require('./user-info.js');
const words = require('./words');
const gameWeb = require('./game-web'); 
const { gamePage } = require('./game-web');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());



app.get('/', express.urlencoded({ extended: false }), (req, res) => {
	const {sid, username} = req.cookies;
	if (sid && username && userinfo.checkUser({username:username, sid:sid})) {
        const {errormessage} = req.query;
        res.send(gameWeb.gamePage({username:username, guesses:userinfo.userwords[username], errormessage:errormessage}));
	} else {
		res.send(gameWeb.loginForm());
	}
});

app.post('/', express.urlencoded({ extended: false }), (req, res) => {
    const {username} = req.cookies;
    const guess = req.body.guess.toLowerCase();
    if (userinfo.userwords[username]['guessedWords'][guess]) {
        res.redirect('/?errormessage=' + 'This word has been guessed! Try another one.');
    } else if (words.includes(guess.toLowerCase())) {
        userinfo.addUserGuessWord({username:username, guess:guess});
        res.redirect('/');
    } else {
        res.redirect('/?errormessage=' + 'Your input is an invalid word! Please select a valid one from the list.');
    }
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
	const username = req.body.username;
	if(username && username != 'dog') {
		const uuidv4 = require('uuid').v4;
		const sid = uuidv4();
		res.cookie('sid', sid);
		res.cookie('username', username);
		userinfo.addUser({username:username, sid:sid});
        userinfo.startOver(username);
		res.redirect('/');
	} else {
		res.send(`
		<!doctype html>
		<html>
		<head>
		<title>Game</title>
		<link rel="stylesheet" href="game.css" />
	    </head>
		<div id='game'>
		<div class= 'errorpage'>
        <p><b>Oops !! Invalid username.Please go back to <a href="/">home page</a></b></p>
		</div>
		</div>
		</html>
        `);
	}

	app.post('/logout',express.urlencoded({ extended: false }), (req, res) => {
         res.clearCookie("sid");
	
		res.redirect('/');
	   });
	})


app.listen(PORT, () => {

console.log(`Listening on http://localhost:${PORT}`);
console.log("--------------------------------------------------");
console.log("Welcome to Guess Word Game Tracking Log:");
console.log("--------------------------------------------------");

});