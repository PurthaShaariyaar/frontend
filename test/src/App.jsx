import './App.css'
import { useState, useEffect } from 'react';

const USERS_URL = 'https://example.com/api/users';

// Fetch users function (only takes `page` as parameter)
const fetchUsers = async (page) => {
  try {
      const response = await fetch(`${USERS_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { count: 0, results: [] }; // Return empty data on failure
  }
};

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchUsers(page);
      setUsers(data.results);
      setCount(data.count);
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  const totalPages = Math.ceil(count / 10);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="pagination">
        <button
          className="first-page-btn"
          onClick={() => setPage(0)}
          disabled={loading || page === 0}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={loading || page === 0}
        >
          previous
        </button>
        <button
          className="next-page-btn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading || page >= totalPages - 1}
        >
          next
        </button>
        <button
          className="last-page-btn"
          onClick={() => setPage(totalPages - 1)}
          disabled={loading || page >= totalPages - 1}
        >
          last
        </button>
      </section>
    </div>
  );
}

export default App
