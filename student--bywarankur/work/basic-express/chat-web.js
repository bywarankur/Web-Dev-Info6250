const chatWeb = {
  chatPage: function (chat) {
    // Fill in anything below!
    return `
    <!doctype html>
      <html>
        <head>
        <title>Chat</title>
        <link rel="stylesheet" href="/chat.css"/>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            <div class="operate-panel">
            ${chatWeb.getOutgoing(chat)}
          </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return (
      `<ol class="messages">` +
      // Fill in!
      chat.messages
        .map(
          (message) => `
        <li>
          <div class="message">
            <div class="meta-info">
              <div class="sender-info">
                <span class="username">${message.sender}</span>
              </div>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>
      `
        )
        .join("") +
      `</ol>`
    );
  },

  getUserList: function (chat) {
    return (
      `<ul class="users">` +
      Object.values(chat.users)
        .map(
          (user) => `
      <li>
        <div class="user">
          <span class="users">${user}</span>
        </div>
      </li>
    `
        )
        .join("") +
      `</ul>`
    );
  },
  getOutgoing: function () {
    // Fill in!
    return `
    <div class="outgoing">
    <form action="/chat" method="POST">
      <input class="userName" name="userName" value="Amit" type="hidden"/>
      <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
      <button type="submit">Send</button>
    </form>
  </div>

`;
  },
};
module.exports = chatWeb;
