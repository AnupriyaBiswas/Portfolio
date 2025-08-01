import React, { useState } from "react";

const Background = () => {
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [hoveredConstellation, setHoveredConstellation] = useState(null);

  return (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 1 }}>
      {/* Debug Display */}
      <div className="fixed top-4 left-4 bg-white text-black p-2 text-xs rounded" style={{ zIndex: 1000 }}>
        <div>Hovered: {hoveredConstellation || 'None'}</div>
        <div>Selected: {selectedConstellation?.name || 'None'}</div>
      </div>

      {/* Simple Test Button */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500 cursor-pointer flex items-center justify-center text-white font-bold rounded-lg"
        style={{ zIndex: 100 }}
        onClick={() => {
          console.log('RED BOX CLICKED!');
          setSelectedConstellation({ name: 'Test Constellation' });
        }}
        onMouseEnter={() => {
          console.log('RED BOX HOVERED!');
          setHoveredConstellation('Test');
        }}
        onMouseLeave={() => {
          console.log('RED BOX MOUSE LEFT!');
          setHoveredConstellation(null);
        }}
      >
        CLICK ME
      </div>

      {/* Test Modal */}
      {selectedConstellation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"
          style={{ zIndex: 1000 }}
          onClick={() => setSelectedConstellation(null)}
        >
          <div 
            className="bg-white text-black p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Modal Works! {selectedConstellation.name}</h2>
            <button 
              onClick={() => setSelectedConstellation(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Background;
