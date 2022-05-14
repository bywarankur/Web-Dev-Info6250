const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;
const uuidv4 = require("uuid").v4;
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sessions = {};
const savedWord = {};

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && sessions[sid]) {
    const username = sessions[sid].username;
    const word = savedWord[username];
    res.send(`

    <html>
    <head>
    <link rel="stylesheet" href="/login.css"/>
    </head>
    <body>
          <div class="main">
            <div class = "user-page">
            <i class = "user-login"><b>You are logged in as ${username}</b></i><br>
            <span class = "data-storage"><b>Your Saved word is ${word}</b></span> 
            </div>
            <form action="/metadata" method="POST" class="metadata">
            Your-Word: <input name="yourword">
            <button type="Submit">Update</button>
            </form>

            <form action="/logout" method="POST" class="logout">
            <button type="Submit">Logout</button>
            </form>
            </div>
            </body>
            </html>
            `);
    return;
  }

  res.send(`
  <html>
  <head>
  <link rel="stylesheet" href="/login.css"/>
  </head>
  <body>
  <div class="login">
        <form action = "/login" method = "POST">
        <b>Username <input name = "username"></b>
        <button type = "submit"> Login</button>
        </form>
        </div>
        </body>
        </html>

        `);
});

app.post("/login", (req, res) => {
  const username = req.body.username.trim();
  if (username === "dog" || !username) {
    res.status(403).send(
      `<link rel="stylesheet" href="/login.css"/>
      <div class = "login">
                <p><b>Invalid username</b></p>
                <a href='/'><b>Oops Invalid user name click to go back to login page !!</b></a>
                </div>`
    );
    return;
  }

  const sid = uuidv4();
  sessions[sid] = { username };
  res.cookie("sid", sid);
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete sessions.sid;
  res.cookie("sid", null);
  res.redirect("/");
});

app.post("/metadata", (req, res) => {
  const word = req.body.yourword.trim();
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    res.status(401).send("Your-Word saved");

    return;
  }

  const username = sessions[sid].username;
  savedWord[username] = word;
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:3000`));
