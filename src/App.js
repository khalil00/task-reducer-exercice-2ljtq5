import React, { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visiter le musée Franz-Kafka', done: true },
  { id: 1, text: 'Voir un spectacle de marionnettes', done: false },
  { id: 2, text: 'Prendre une photo du mur John Lennon', done: false },
];

export default function TaskApp() {
  function taskreducer(state, action) {
    if (action.type === 'addTask') {
      return [
        ...state,
        { id: nextId++, text: action.newTask, done: false }
      ];
      
    } else if (action.type === 'changeTask') {
      return state.map((val) => {
        if (val.id === action.task.id) val.done = action.task.done;
        return val;
      });

    } else if (action.type === 'deleteTask') {
      return state.filter((a) => a.id !== action.id);
    }
  }

  const [taskState, dispatch] = useReducer(taskreducer, initialTasks);

  function handleAddTask(text) {
    dispatch({ type: 'addTask', newTask: text });
  }

  function handleChangeTask(task) {
    dispatch({ type: 'changeTask', task: task });
  }

  function handleDeleteTask(taskId) {
    dispatch({ type: 'deleteTask', id: taskId });
  }

  return (
    <>
      <h1>Guide de Prague</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={taskState}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
