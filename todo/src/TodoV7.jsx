import { useState, useMemo } from 'react';
import './App.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      {['Todo', 'Completed'].map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(index)}
          className={activeTab === index ? 'btn-active' : 'btn'}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

function TodoV7() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 0 for "Todo", 1 for "Completed"

  const addTodo = () => {
    if (!input.trim()) {
      alert('Please enter a todo!');
      return;
    }
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const filteredTodos = useMemo(() => {
    return activeTab === 0
      ? todos.filter(todo => !todo.done) // Show uncompleted todos
      : todos.filter(todo => todo.done); // Show completed todos
  }, [todos, activeTab]);

  return (
    <div>
      <h1>Todo V2 App</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.text} {todo.done ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoV7;
