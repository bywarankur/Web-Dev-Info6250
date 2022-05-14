const users = {};

const PROFILE = {
  theme: "funky",
};

const getInfo = (username) => {
  if (!users[username]) {
    users[username] = { ...PROFILE, username };
  }
  return users[username];
};

module.exports = {
  getInfo,
};
