const { v4: uuidv4 } = require("uuid");

const { getSlot, deleteSlots, getSlotList } = require("./slot-information");

const users = {
  44: {
    id: "44",
    username: "ankurbywar",
    slotOwner: [1],
    ReservedSlot: [
      {
        slotId: 2,
        isGoing: "",
      },
    ],
  },

  45: {
    id: "45",
    username: "shikha",
    slotOwner: [3],
    ReservedSlot: [
      {
        slotId: 1,
        isGoing: "",
      },
    ],
  },

  46: {
    id: "46",
    username: "vivek",
    slotOwner: [2],
    ReservedSlot: [
      {
        slotId: 3,
        isGoing: "",
      },
    ],
  },
};

const createUser = (username) => {
  const uid = uuidv4();
  const userList = Object.values(users);

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      return 401;
    }
  }
  users[uid] = {
    id: uid,
    username: username.toLowerCase(),
    slotOwner: [],
    ReservedSlot: [],
  };
  return users[uid];
};

const addSlotIdOwner = (username, slotId) => {
  const userList = Object.values(users);
  let matchedUser = {};

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      matchedUser = user;

      break;
    }
  }

  matchedUser.slotOwner.push(slotId);
};

const addSlotIdBooked = (invitedList, slotId) => {
  const userList = Object.values(users);
  let matchedUser = {};

  for (const invitedUser of invitedList) {
    for (const user of userList) {
      if (user.username === invitedUser.toLowerCase()) {
        matchedUser = user;

        break;
      }
    }
    matchedUser.ReservedSlot.push({
      slotId: slotId,
      isGoing: "",
    });
  }
};

const removeSlotOwnerList = (slotId, username) => {
  const userList = Object.values(users);
  let matchedUser = {};

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      matchedUser = user;

      break;
    }
  }

  if (matchedUser) {
    for (let index = 0; index < matchedUser.slotOwner.length; index++) {
      if (matchedUser.slotOwner[index] === slotId) {
        matchedUser.slotOwner.splice(index, 1);

        break;
      }
    }
  }
};

const removeSlotBooked = (slotId, invitedList) => {
  const userList = Object.values(users);
  let matchedUser = {};

  for (const invitedUser of invitedList) {
    for (const user of userList) {
      if (user.username === invitedUser.toLowerCase()) {
        matchedUser = user;

        for (let index = 0; index < matchedUser.ReservedSlot.length; index++) {
          if (matchedUser.ReservedSlot[index].slotId === slotId) {
            matchedUser.slotOwner.splice(index, 1);

            break;
          }
        }
      }

      break;
    }
  }
};

const getCreatedSlots = (username) => {
  const userList = Object.values(users);
  const createdSlots = [];
  let matchedUser = {};

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      matchedUser = user;
      break;
    }
  }

  matchedUser.slotOwner.forEach((ownerId) => {
    createdSlots.push(getSlot(ownerId));
  });
  return createdSlots;
};

const getBookedSlots = (username) => {
  const userList = Object.values(users);
  let invitedList = [];
  const ReservedSlotIds = [];

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      invitedList = user.ReservedSlot;
      break;
    }
  }

  for (let i = 0; i < invitedList.length; i++) {
    ReservedSlotIds.push({
      slot: getSlot(invitedList[i].slotId),
      isGoing: invitedList[i].isGoing,
    });
  }

  return ReservedSlotIds;
};

const getUsers = () => {
  return users;
};

const getUser = (username) => {
  const userList = Object.values(users);

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      return user;
    }
  }
  return 401;
};

const removeUser = (userId) => {
  const user = users[userId];
  const ownerMeetupList = user.slotOwner;

  ownerMeetupList.forEach((slot) => {
    deleteSlots(slot);
  });

  delete users[userId];
  return user;
};

const updateFeedback = (feedback) => {
  const userList = Object.values(users);
  const username = feedback.username;
  let matchedUser = {};
  let oldFeedback = "";

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      matchedUser = user;

      break;
    }
  }

  for (const invite of matchedUser.ReservedSlot) {
    if (invite.slotId === feedback.eventId) {
      oldFeedback = invite.isGoing;
      invite.isGoing = feedback.isAttending;

      break;
    }
  }
  return oldFeedback;
};

const removeBookedSlot = (username, slotId) => {
  const userList = Object.values(users);
  let matchedUser = {};

  for (const user of userList) {
    if (user.username === username.toLowerCase()) {
      matchedUser = user;

      break;
    }
  }
  let slotList1 = matchedUser.ReservedSlot;
  for (const slot of slotList1) {
    if (slot.slotId === slotId) {
      matchedUser.ReservedSlot.splice(index, 1);

      break;
    }
  }
};

module.exports = {
  users,
  removeBookedSlot,
  updateFeedback,
  removeUser,
  getUser,
  getUsers,
  getBookedSlots,
  getCreatedSlots,
  removeSlotBooked,
  removeSlotOwnerList,
  addSlotIdBooked,
  addSlotIdOwner,
  createUser,
};
