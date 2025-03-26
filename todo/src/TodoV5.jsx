import { useState } from 'react';
import './App.css';

let id = 0;

const db = {};

const INITIAL_TASKS = [
  { id: id++, text: 'Task 1' },
  { id: id++, text: 'Task 2' }
];

INITIAL_TASKS.forEach((task) => {
  db[task.id] = task;
});

function TodoV5() {
  const [todos, setTodos] = useState(Object.values(db));
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) {
      alert('Please enter a todo.');
      return;
    }
    const newTask = { id: id++, text: input }
    db[newTask.id] = newTask;
    setTodos(Object.values(db));
    setInput('');
  }

  const completeTodo = (id) => {
    delete db[id];
    setTodos(Object.values(db));
  }

  return (
    <div>
      <h3>Todo V5 App</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={addTodo}
      >
        Add
      </button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoV5;
