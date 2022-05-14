const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 4000;

const { authenticate } = require("./authenticate");
const {
  users,
  getCreatedSlots,
  removeSlotBooked,
  removeSlotOwnerList,
  addSlotIdBooked,
  addSlotIdOwner,
  createUser,
  removeBookedSlot,
  updateFeedback,
  removeUser,
  getUser,
  getBookedSlots,
} = require("./users-information");
const {
  slots,
  updateSlotFeedback,
  updateTask,
  createdSlot,
  getSlot,
  deleteSlots,
} = require("./slot-information");

app.use(cookieParser());
app.use(express.static("./build"));

app.get("/session", (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "LOGIN_MANDATORY" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "UNAUTHORIZED_LOGIN" });
    return;
  }

  res.status(200).json(users[id]);
});

app.post("/session", express.json(), (req, res) => {
  const username = req.body.username;

  res.clearCookie("id");
  if (!username) {
    res.status(400).json({ code: "USERNAME_MANDATORY" });
    return;
  }
  const response = getUser(username);
  if (response === 401) {
    res.status(401).json({ code: "REGISTRATION_MANDATORY" });
    return;
  }
  res.cookie("id", response.id);
  res.status(200).json(response);
});

app.delete("/logout", express.json, (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }
  res.clearCookie("id");
  res.sendStatus(200);
});

app.get("/users", (req, res) => {
  const id = req.cookies.id;
  if (!id) {
    res.status(401).json({ code: "LOGIN_MANDATORY" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "UNAUTHORIZED_LOGIN" });
    return;
  }
  res.status(200).json(users);
});

app.get("/slots/:username", (req, res) => {
  const id = req.cookies.id;
  const username = req.params.username;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }

  const getCreatedMeet = getCreatedSlots(username);
  const getInvitedMeet = getBookedSlots(username);

  res.json({
    createdSlots: getCreatedMeet,
    bookedSlots: getInvitedMeet,
  });
});

app.get("/slot/:slotId", (req, res) => {
  const id = req.cookies.id;
  const slotId = req.params.slotId;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }
  const slot = getSlot(slotId);

  if (slot === 403) {
    res.status(403).json({ code: "NON_EXIST_SLOT" });
    return;
  }
  res.json(getSlot(slotId));
});

app.post("/slot", express.json(), (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }
  const slot = req.body;

  const addMeet = createdSlot(slot);
  if (addMeet.code === 406) {
    res.status(406).json({ code: addMeet.result });
    return;
  }
  const newMeet = addMeet.result;
  addSlotIdOwner(newMeet.host, newMeet.slotId);
  addSlotIdBooked(newMeet.members, newMeet.slotId);
  res.json(newMeet);
});

// app.post("/signingup", express.json(), (req, res) => {
//   const username = req.body.username;

//   res.clearCookie("id");
//   if (!username) {
//     res.status(400).json({ code: "USERNAME_MANDATORY" });
//     return;
//   }
//   if (!authenticate.isValidLogin(username)) {
//     res.status(403).json({ code: "UNAUTHORIZED_LOGIN" });
//     return;
//   }
//   const incomingUser = createUser(username);
//   if (incomingUser === 401) {
//     res.status(401).json({ code: "DUPLICATE_USERNAME" });
//     return;
//   }
//   res.cookie("id", incomingUser.id);
//   res.status(200).json(incomingUser);
// });

app.delete("/signingup", express.json(), (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }
  res.clearCookie("id");
  removeUser(id);
  res.sendStatus(200);
});

app.delete("/session", express.json(), (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "UID_MISSING" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "UID_UNKNOWN" });
    return;
  }
  res.clearCookie("id");
  res.sendStatus(200);
});

app.post("/signingup", express.json(), (req, res) => {
  const username = req.body.username;

  res.clearCookie("id");
  if (!username) {
    res.status(400).json({ code: "USERNAME_MANDATORY" });
    return;
  }
  if (!authenticate.isValidLogin(username)) {
    res.status(403).json({ code: "UNAUTHORIZED_LOGIN" });
    return;
  }
  const incomingUser = createUser(username);
  if (incomingUser === 401) {
    res.status(401).json({ code: "DUPLICATE_USERNAME" });
    return;
  }
  res.cookie("id", incomingUser.id);
  res.status(200).json(incomingUser);
});

app.put("/slot", express.json(), (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }

  const slot = req.body;

  const prevMeetup = getSlot(slot.slotId);
  removeSlotBooked(prevMeetup.slotId, prevMeetup.members);

  const updatedMeetup = updateTask(slot);

  if (updatedMeetup.code === 406) {
    res.status(406).json({ code: updatedMeetup.result });
    return;
  }

  const newMeetup = updatedMeetup.result;
  addSlotIdBooked(newMeetup.members, newMeetup.slotId);
  res.json(newMeetup);
});

app.put("/response", express.json(), (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }

  const feedback = req.body;
  let oldFeedback = updateFeedback(feedback);
  updateSlotFeedback(feedback, oldFeedback);

  const createdMeetup = getCreatedSlots(feedback.username);
  const ReservedSlot = getBookedSlots(feedback.username);

  res.json({
    createdSlots: createdMeetup,
    bookedSlots: ReservedSlot,
  });
});

app.delete("/slot/:slotId", express.json(), (req, res) => {
  const id = req.cookies.id;
  const slotId = req.params.slotId;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }

  const slot = deleteSlots(slotId);
  removeSlotOwnerList(slotId, slot.anchor - person);
  removeSlotBooked(slotId, slot.members);
  res.sendStatus(200);
});

app.delete("/:username/slot/:slotId", express.json(), (req, res) => {
  const id = req.cookies.id;
  const slotId = req.params.slotId;
  const username = req.params.username;

  if (!id) {
    res.status(401).json({ code: "ID_UNAVAILABLE" });
    return;
  }
  if (!users[id]) {
    res.clearCookie("id");
    res.status(403).json({ code: "ID_NOT_KNOWN" });
    return;
  }

  removeBookedSlot(username, slotId);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
