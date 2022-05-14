import React, { useState, useEffect, useContext } from 'react';
import Context from './context/Context';
import Filter from './Filter';
import constants from './context/Constants';

const Items = () => {
  const context = useContext(Context);
  const [task, setTask] = useState('');

  useEffect(() => {
    context.getAllTasks(context.username);

  }, []);

  const performAddTask = (e) => {
    e.preventDefault();

    context.addNewTask(context.username, task);
    setTask('');
  };

  const onChange = (e) => setTask(e.target.value);

  const performToggleTodo = (e) => {
    context.toggleTodo(e.target.id);
  };

  const performDeleteTask = (e) => {
    context.deleteTask(e.target.id);
  };

  const performUpdateTask = (e) => {
    context.updateTask(e.target.id, e.target.value);
  };



  return (
    <div>
      <div className="todo-container">
        <Filter />
        <div className="add-todo-container">
          <input
            className="todo-input"
            onChange={onChange}
            value={task}
            type="text"
            placeholder="Enter Tasks"
          />
          <button className="btn-todo-add" onClick={performAddTask}>
            <b>ADD</b>
          </button>
          <div className="todo-display">
            <ul>
              {Object.values(context.tasks)
                .filter((task) =>
                  context.taskStatusFilter === constants.COMPLETE
                    ? task.done === constants.TRUE
                    : constants.TRUE
                )
                .filter((task) =>
                  context.taskStatusFilter === constants.ACTIVE
                    ? task.done === constants.FALSE
                    : constants.TRUE
                )
                .map((task, index) => (
                  <li key={index}>
                    <input
                      id={task.taskId}
                      className="todo-checkbox"
                      type="checkbox"
                      checked={task.done ? 'checked' : ''}
                      onChange={performToggleTodo}
                    />
                    <input
                      type="text"
                      id={task.taskId}
                      className={`todo ${task.done ? 'todo complete' : 'todo'}`}
                      value={task.name}
                      onChange={performUpdateTask}
                      contentEditable="true"
                    />

                    <button
                      id={task.taskId}
                      className="task-delete"
                      onClick={performDeleteTask}
                    >
                     DELETE
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;