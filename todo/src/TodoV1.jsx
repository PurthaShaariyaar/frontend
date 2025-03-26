import { useState, useEffect } from 'react';
import './App.css';

function TodoV1() {

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input}]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <h1>Todo V1 App</h1>
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

export default TodoV1;
