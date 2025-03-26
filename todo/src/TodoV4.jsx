import { useState, useEffect } from 'react';
import './App.css';

function TodoV4() {

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) {
      alert('Please enter in a todo.');
      return;
    }
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  }

  const completeTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id ));
  };

  return (
    <div>
      <h2>Todo V4 App</h2>
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
  );
}

export default TodoV4;
