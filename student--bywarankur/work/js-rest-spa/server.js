const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const todos = require('./todos');

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  console.log("hello");
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, todos.makeTodoList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTodos());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// Todos
app.get('/api/todos', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getTodos());
});

app.post('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { task } = req.body;
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  const todoList = users.getUserData(username);
  // const id = todoList.addTodo(task);
  const id = todoList.addTodo(quantity);
  res.json(todoList.getTodo(id));
});

app.get('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(todoList.getTodo(id));
});

app.get('/api/todos/edit', (req,res) =>{
  console.log(todos);
})
/* put fun for updating quantity */
app.put('/api/todos/edit', (req,res)=>{
  const {id, quantityChange} = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  // const todoList = users.getUserData(username);
  console.log(sid, id, username, quantityChange)
  const todos = users.getUserData(username).getTodos();
  
  if(!id){
    res.status(400).json({error:'missing'});
    return;
  }
  if(!todos[id]){
    res.status(400).json({error:'not exists'});
  }

  //const username = todos[id].username;
  const quantity = todos[id].quantity + quantityChange;

  todos[id] = {
    id,
    quantity
  };
  console.log(todos)
  res.status(200).json(todos);
});

app.patch('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const{ quantity } = req.body;
  const todoList = users.getUserData(username);
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  //todoList.updateTodo(id, { task, done });
  todoList.updateTodo(id,quantity);
  res.json(todoList.getTodo(id));
});

app.delete('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);
  if(exists) {
    todoList.deleteTodo(id);
  }
  res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

