import { useState, useEffect } from 'react';
import './App.css';

// fetchUsers, normally would be in utils/fetchUsers.js
const fetchUsers = async (page, limit = 5) => {
  try {
    const url = `https://jsonplaceholder.typicode.com/users?_limit=${limit}&_page=${page}`;
    console.log("Fetching URL:", url); // Log URL to check
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchUsers(page);
      setUsers((prev) => {
        const newProducts = data.filter(product => !prev.some(p => p.id === product.id));
        return [...prev, ...newProducts];
      });
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID #</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setPage((prev) => prev + 1)} // Increment page on click
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}

export default Users;
