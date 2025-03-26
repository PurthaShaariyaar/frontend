import React, { useState, useEffect } from 'react';

function LikeDisklike() {
  const [count, setCount] = useState(() => {
    return JSON.parse(localStorage.getItem("likes") || 0);
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(count));
  }, [count]);

  return (
    <div>
      <h2>Likes: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default LikeDisklike;
