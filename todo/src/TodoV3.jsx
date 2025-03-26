import { useState, useEffect } from 'react';
import './App.css';

const db = {};

function TodoV3() {

  const [todos, setTodos] = useState(() => Object.values(db));
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) {
      alert('Please enter a todo!');
      return;
    }
    const id = new Date();
    db[id] = { id, text: input };
    setTodos(Object.values(db));
    setInput('');
  }

  const toggleTodo = (id) => {
    delete db[id];
    setTodos(Object.values(db));
  }

  return (
    <div>
      <h1>Todo V3 App</h1>
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
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoV3;
