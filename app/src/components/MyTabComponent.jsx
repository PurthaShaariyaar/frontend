import React, { useState } from 'react';

const MyTabComponent = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='tabs'>
      {React.Children.map(children, (child, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={activeIndex === index ? "btn-active" : "btn"}
          disabled={activeIndex === index}
        >
          {child.props.title}
        </button>
      ))}
      <div className='view'>{children[activeIndex]}</div>
    </div>
  );
};

export default MyTabComponent;
