import React, { useState } from "react";

const Background = () => {
  const [testState, setTestState] = useState(0);

  console.log('Component render, testState:', testState);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: 'black',
      zIndex: 999999 
    }}>
      {/* Counter test */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        zIndex: 1000000
      }}>
        <h1>Test State: {testState}</h1>
        <button 
          onClick={() => {
            console.log('Button clicked! Current state:', testState);
            setTestState(testState + 1);
            console.log('State should now be:', testState + 1);
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          Increment ({testState})
        </button>
        <br />
        <button 
          onClick={() => setTestState(0)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Background;
