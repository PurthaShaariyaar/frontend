import { useState } from 'react';
import './App.css';

// Reusable Tabs component
const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

function TodoV11() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('all'); // Keeps track of which tab is selected

  const handleAddTodo = () => {
    if (!input.trim()) {
      setError("Please enter a todo.");
      return;
    }
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
    setError('');
  };

  const handleCompleteTodo = (id) => {
    setTodos((prev) =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Toggle the completed status
      )
    );
  };

  const filteredTodos = selectedTab === 'all'
    ? todos.filter(todo => !todo.completed) // Show only incomplete todos
    : todos.filter(todo => todo.completed); // Show only completed todos

  return (
    <div>
      <h3>Todo App</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      {error && <p>{error}</p>} {/* Display error message if any */}

      {/* Using the Tabs component */}
      <Tabs
        tabs={['all', 'completed']}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {/* Show the remaining todos text only when "all" tab is selected */}
      {selectedTab === 'all' && (
        <p>{filteredTodos.length} todos remaining</p>
      )}

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            {!todo.completed && (
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo.id)}
              />
            )}
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoV11;
