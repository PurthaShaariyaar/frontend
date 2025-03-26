import { useState, useEffect } from 'react';
import './App.css';

// constants
const TOTAL_USERS = 10;
const LIMIT = 2;

// utils/api/fetchUsers.js
const fetchUsers = async (page, limit=LIMIT) => {
  try {
    const url = `https://jsonplaceholder.typicode.com/users?_limit=${LIMIT}&_page=${page}`;
    console.log('Fetching URL: ', url);
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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const headers = ["ID #", "Name", "Email", "Phone"];

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchUsers(page);
      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, [page]);

  // calculate total number of pages
  const totalPages = (TOTAL_USERS / LIMIT);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
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
      <section>
        <button
          onClick={() => setPage(1)}
          disabled={loading || page === 1}
        >
          First
        </button>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={loading || page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading || page >= totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={loading || page >= totalPages}
        >
          Last
        </button>
      </section>
    </div>
  )
}

export default Users;
