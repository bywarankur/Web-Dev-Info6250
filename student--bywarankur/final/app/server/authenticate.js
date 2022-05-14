const authenticate = {
  isValidLogin: (user) => {
    if (user.toLowerCase().includes("dog")) {
      return false;
    }
    if (!user.match(/^[A-Za-z0-9_-]{2,26}$/)) {
      return false;
    }
    if (!user) {
      return false;
    }
    return true;
  },
};
module.exports = { authenticate };
