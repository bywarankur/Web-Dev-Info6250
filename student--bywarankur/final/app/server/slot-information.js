const slotList = {
  1: {
    slotId: 1,
    topic: "Demo for A-10",
    date: "05/20/2021",
    time: "03:00:00",
    vennue: "portland",
    description: "demonstraye login page",
    host: "ankurbywar",
    members: ["shikha"],
    membersConfirmed: 0,
    membersNotConfirmed: 0,
  },

  2: {
    slotId: 2,
    title: "Group-Project-Presentation",
    date: "06/25/2022",
    time: "01:00:00",
    vennue: "Quincy",
    description: "Leadership",
    host: "vivek",
    members: ["ankurbywar"],
    membersConfirmed: 0,
    membersNotConfirmed: 0,
  },

  3: {
    slotId: 3,
    title: "Agile presentation",
    description: "Demo Discussion",
    date: "05/29/2021",
    time: "12:30:00",
    vennue: "Hawai",
    host: "shikha",
    members: ["vivek"],
    membersConfirmed: 0,
    membersNotConfirmed: 0,
  },
};

const increment = () => {
  let incr = 5;
  return () => {
    incr += 1;
    return incr;
  };
};

const incrementId = increment();

const createdSlot = (task) => {
  const incrementMeetupId = incrementId();
  let err = "";

  if (!task.title || !/\S/.test(task.title)) {
    err = err + "Title ";
  }

  if (!task.place || !/\S/.test(task.place)) {
    err = err + "Place ";
  }

  if (!task.date || !/\S/.test(task.date)) {
    err = err + "Date ";
  }

  if (!task.time || !/\S/.test(task.time)) {
    err = err + "Time ";
  }

  if (!task.description || !/\S/.test(task.description)) {
    err = err + "Agenda ";
  }

  if (err != "") {
    err = err + "Kindly fill empty field";
    return { code: 406, result: err };
  }

  slotList[incrementMeetupId] = {
    slotId: incrementMeetupId,
    title: task.title,
    description: task.description,
    date: task.date,
    time: task.time,
    place: task.place,
    host: task.host,
    members: task.members,
    membersConfirmed: 0,
    membersNotConfirmed: 0,
  };

  return { code: 0, result: slotList[incrementMeetupId] };
};

const updateTask = (task) => {
  let err = "";

  if (!task.title || !/\S/.test(task.title)) {
    err = err + "Title ";
  }

  if (!task.place || !/\S/.test(task.place)) {
    err = err + "Place ";
  }

  if (!task.date || !/\S/.test(task.date)) {
    err = err + "Date ";
  }

  if (!task.time || !/\S/.test(task.time)) {
    err = err + "Time ";
  }

  if (!task.description || !/\S/.test(task.description)) {
    err = err + "Agenda ";
  }

  if (err != "") {
    err = err + "* Kindly fill empty field";
    return { code: 406, result: err };
  }

  slotList[task.slotId] = {
    slotId: task.slotId,
    title: task.title,
    description: task.description,
    date: task.date,
    time: task.time,
    place: task.place,
    host: task.host,
    members: task.members,
    membersConfirmed: 0,
    membersNotConfirmed: 0,
  };

  return { code: 0, result: slotList[task.slotId] };
};

const updateSlotFeedback = (feedback, oldFeedback) => {
  const task = slotList[feedback.slotId];

  if (oldFeedback === "") {
    if (feedback.isAttending === "Yes") {
      task.membersConfirmed += 1;
    } else if (feedback.isAttending === "No") {
      task.membersNotConfirmed += 1;
    }
  } else if (oldFeedback === "No") {
    if (feedback.isAttending === "Yes") {
      task.membersConfirmed += task.membersConfirmed;
      task.membersNotConfirmed -= task.membersNotConfirmed;
    }
  } else if (oldFeedback === "Yes") {
    if (feedback.isAttending === "No") {
      task.membersConfirmed -= task.membersConfirmed;
      task.membersNotConfirmed += task.membersNotConfirmed;
    }
  }
};

const deleteSlots = (slotId) => {
  const task = slotList[slotId];
  delete slotList[slotId];
  return task;
};

const getSlotList = () => {
  return slotList;
};

const getSlot = (slotId) => {
  if (!slotList[slotId]) {
    return 403;
  }
  return slotList[slotId];
};

module.exports = {
  getSlotList,
  deleteSlots,
  updateSlotFeedback,
  updateTask,
  createdSlot,
  getSlot,
};
