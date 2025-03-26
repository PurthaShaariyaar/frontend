import React, { useState, useEffect, useCallback, useRef } from 'react';

// in real production put fetchPhotos in: utils/api.js
const fetchPhotos = async (page, limit = 6) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error(error);
    return [];
  }
}

// in real product put custom hook: hooks/useInfiniteScroll.js
const useInfiniteScroll = (setPage, loading) => {
  const observer = useRef();

  return useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, setPage]);
}


function InfiniteScroll() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const newPhotos = await fetchPhotos(page);
      setPhotos((prev) => [...prev, ...newPhotos]);
      setLoading(false);
    };

    loadPhotos();
  }, [page])

  const lastPhotoRef = useInfiniteScroll(setPage, loading);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lazy Loading Images with Pagination</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {photos.map((photo, index) => (
          <div>
            <h3>{photo.id} : {photo.title}</h3>
            <img
              key={photo.id}
              ref={index === photos.length - 1 ? lastPhotoRef : null}
              src={photo.thumbnailUrl}
              alt={photo.title}
              loading="lazy"
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      {loading && <p>Loading more photos...</p>}
    </div>
  );
}

export default InfiniteScroll;
