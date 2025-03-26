import { useState } from 'react';

function TodoV9() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const handleAddTodo = () => {
    if (!input.trim()) {
      setError('Please enter a todo!');
      return;
    }

    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
    setError('');
  };

  const handleCompleteTodo = (id) => {
    setTodos((prev) =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const filteredTodos = selectedTab === 'all'
    ? todos.filter(todo => !todo.completed)
    : todos.filter(todo => todo.completed);

  return (
    <div>
      <h3>Todo V9</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter todo...'
      />
      <button
        onClick={handleAddTodo}
      >
        Add
      </button>

      {error && <p>{error}</p>}

      <div>
        <button
          onClick={() => setSelectedTab('all')}
        >
          Todos
        </button>
        <button
          onClick={() => setSelectedTab('completed')}
        >
          Completed
        </button>
      </div>

      {selectedTab === 'all' && (
        <p>{filteredTodos.length} todos remaining.</p>
      )}

      <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
          >
            {todo.text}
            {!todo.completed && (
              <button
                onClick={() => handleCompleteTodo(todo.id)}
              >
                Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoV9;
