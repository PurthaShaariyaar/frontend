import { useState } from 'react';
import './App.css';

function TodoV8() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) {
      alert('Please enter a todo!');
      return;
    }
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const markAsCompleted = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo V2 App</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <table>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{!todo.completed ? todo.text : ''}</td>
              <td>
                {!todo.completed ? (
                  <button onClick={() => markAsCompleted(todo.id)}>
                    Complete
                  </button>
                ) : (
                  <>
                    {todo.text}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoV8;
