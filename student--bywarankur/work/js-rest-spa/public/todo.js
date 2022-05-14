"use strict";
(function iife() {
  // We store these as an object because we will access by id
  let stateTodos = {};

  const MESSAGES = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Something went wrong.  Please try again",
  };

  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();


  /////////////////////////////////
  function setLoggedIn(isLoggedIn) {
    // Notice how more complicated this is because we're not basing this off of state data
    // Not just here, but in the places we have to change our login status
    const loginEl = document.querySelector("main");
    if (isLoggedIn) {
      loginEl.classList.remove("not-logged-in");
      loginEl.classList.add("logged-in");
    } else {
      loginEl.classList.add("not-logged-in");
      loginEl.classList.remove("logged-in");
    }
    render();
    renderStatus("");
  }

  function renderOnLogin(todos) {
    stateTodos = todos;
    setLoggedIn(true);
  }

  function checkForSession() {
    fetchSession()
      .then(populateTodos)
      .catch(() => setLoggedIn(false));
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector(".login button");
    const usernameEl = document.querySelector(".login__username");
    buttonEl.addEventListener("click", (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
        .then(renderOnLogin)
        .catch((error) => renderStatus(error));
    });
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", (e) => {
      stateTodos = {};
      fetchLogout()
        .then(() => setLoggedIn(false))
        .catch((error) => renderStatus(error));
    });
  }

  function populateTodos() {
    fetchTodos()
      .then((rawTodos) => {
        stateTodos = rawTodos;
        setLoggedIn(true);
        render();
        renderStatus("");
      })
      .catch((error) => {
        renderStatus(error);
      });
  }

  /* Adding event handler in items list on + button and calling PUT api for increasing the quantity by 1 */
  function addAbilityToAddTodo() {
    console.log("test");
    
    const id = Object.keys(stateTodos)
    // console.log(id)
    let body = {
      id: id,
      quantityChange: 1}

    fetch(`/api/todos/edit`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => Promise.reject({error: 'network-error'}))
    .then(res =>{
      return res.json();
    })      
    .then(rawTodos => {
            console.log("hello",rawTodos)
            stateTodos = rawTodos;
        setLoggedIn(true);
        render();
        const id = Object.keys(stateTodos)
      if(stateTodos[id].quantity >= 1){

      
      document.getElementById("decrease-button").disabled = false;}
           // render(stateTodos);
            renderStatus('');
          })
          .catch(err => {
            console.log("error");
            renderStatus(MESSAGES[err.error] || err.error);
          });
        
    
  }



  /*Adding event handler in items list on - button and calling PUT api for decreasing the quantity by 1 */
  function addAbilityToRemoveTodo() {
  const id = Object.keys(stateTodos)
  // console.log(id)
  let body = {
    id: id,
    quantityChange: -1}

  fetch(`/api/todos/edit`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(() => Promise.reject({error: 'network-error'}))
  .then(res =>{
    return res.json();
  })      
  .then(rawTodos => {
          console.log("hello",rawTodos)
          stateTodos = rawTodos;
      setLoggedIn(true);
      render();
      const id = Object.keys(stateTodos)
      if(stateTodos[id].quantity == 0){

      
      document.getElementById("decrease-button").disabled = true;}
         // render(stateTodos);
          renderStatus('');
        })
        .catch(err => {
          console.log("error");
          renderStatus(MESSAGES[err.error] || err.error);
        });
      
  
}

const increaseBtn = document.getElementById("increase-button");
increaseBtn.addEventListener("click", addAbilityToAddTodo);
const decreaseBtn = document.getElementById("decrease-button");
decreaseBtn.addEventListener("click", addAbilityToRemoveTodo); 

  

  function fetchTodos() {
    return fetch("/api/todos")
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchSession() {
    return fetch("/api/session", {
      method: "GET",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchLogout() {
    return fetch("/api/session", {
      method: "DELETE",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }


  function render({ add } = {}) {
    const html = Object.values(stateTodos)
      .map((todo) => {
        const isDoneClass = todo.done ? "todo__text--complete" : "";
        const isAddedClass = add === todo.id ? "todo__text--added" : "";
        return `
      
        <label class="todo"
        >
         
          <span
            data-id="${todo.id}"
            class="todo__toggle todo__text ${isDoneClass} ${isAddedClass} "
          >
            ${todo.quantity}
          </span>
        </label>
        
     
      `;
      })
      .join("");
    const todosEl = document.querySelector(".todos");
    todosEl.innerHTML = html;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector(".status");
    if (!message) {
      statusEl.innerText = "";
      return;
    }
    const key = message?.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }
})();