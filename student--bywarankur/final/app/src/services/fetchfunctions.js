export const translateErrMsgs = (err) => Promise.reject(err);

export const fetchSigningupPage = (username, firstName, lastName) => {
  return fetch("/signingup", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username, firstName, lastName }),
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};
export const fetchLoginStatus = () => {
  return fetch("/session", {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchLogin = (username) => {
  console.log("fetch new login", username);
  return fetch("/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchSlotForUser = (slotId) => {
  return fetch(`/slot/${slotId}`, {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};
export const fetchSlotList = (username) => {
  return fetch(`/slots/${username}`, {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json.then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchLogout = () => {
  console.log("logout fetch");

  return fetch("/session", {
    method: "DELETE",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.ok;
    });
};

export const fetchValidUsers = () => {
  return fetch("/users", {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchDeleteSigningup = () => {
  return fetch("/signingup", {
    method: "DELETE",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.ok;
    });
};

export const fetchCreateMeetupPage = (
  title,
  host,
  place,
  date,
  time,
  description,
  members
) => {
  const slot = {
    title: title,
    description: description,
    date: date,
    time: time,
    place: place,
    host: host,
    members: members,
  };
  return fetch("/slot", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(slot),
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchUpdateSlot = (
  title,
  id,
  host,
  place,
  date,
  time,
  description,
  members
) => {
  const slot = {
    title: title,
    slotId: id,
    host: host,
    place: place,
    date: date,
    time: time,
    description: description,
    members: members,
  };
  console.log(slot);

  return fetch("/slot", {
    method: "PUT",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(slot),
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchUpdateFeedback = (username, isAttending, slotId) => {
  const feedback = {
    username: username,
    isAttending: isAttending,
    slotId: slotId,
  };
  return fetch("/response", {
    method: "PUT",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(feedback),
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.json();
    });
};

export const fetchRemoveCreatedSlot = (slotId) => {
  return fetch(`/slot/${slotId}`, {
    method: "DELETE",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.ok;
    });
};

export const fetchRemoveInvitedMeetup = (username, slotId) => {
  return fetch(`/${username}/slot/${slotId}`, {
    method: "DELETE",
  })
    .catch(() => {
      return Promise.reject({ code: "NETWORK_ERROR" });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(translateErrMsgs);
      }
      return response.ok;
    });
};
