import React, { useState } from 'react';

const TestComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'blue',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      zIndex: 999999
    }}>
      <h1>Count: {count}</h1>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          padding: '20px', 
          fontSize: '20px', 
          backgroundColor: 'red', 
          color: 'white', 
          border: 'none' 
        }}
      >
        Click Me
      </button>
    </div>
  );
};

export default TestComponent;
