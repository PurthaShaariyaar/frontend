import { useState } from 'react';

function TodoV2() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAddTodo = () => {
    if (!input.trim()) {
      setError("Please enter a todo.");
      return;
    }
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
    setError('');
  }

  const handleCompleteTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <h2>Todo V2 App</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo..."
      />
      <button
        onClick={handleAddTodo}
      >
        Add
      </button>

      {error && <p>{error}</p>}

      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
          >
            {todo.text}
            <button
              onClick={() => handleCompleteTodo(todo.id)}
            >
              Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoV2;
