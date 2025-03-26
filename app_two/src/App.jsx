import './App.css';
import { useState, useEffect } from 'react';

// typically would use axios, not available in codility
// in real production would create api/fetchPhotos.tsx or .jsx in a separate directory for reusability
const fetchPhotos = async (page, limit = 10) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
    );
    if (!response) {
      throw new Error(`Failed to fetch photos: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function App() {

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const data = await fetchPhotos(page);
      setPhotos((prev) => [...prev, ...data]);
      setLoading(false);
    };

    loadPhotos();
  }, [page])

  return (
    <div>
      <table>
        <thead>
          <tr>ID</tr>
          <tr>Title</tr>
          <tr>Thumbnail</tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>{photo.title}</td>
              <td>
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  loading='lazy'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  )
}

export default App
