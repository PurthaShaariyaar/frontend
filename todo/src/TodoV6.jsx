import { useState } from 'react';
import './App.css';

function TodoV6() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) {
      alert('Please enter a todo!');
      return;
    }
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  }

  const completeTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <h3>Todo V6 App</h3>
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
          >
            {todo.text}
            <button onClick={() => completeTodo(todo.id)}>
              Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoV6;
