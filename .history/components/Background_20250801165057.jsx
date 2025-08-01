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

      {/* Simplified Modal */}
      {selectedConstellation && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-gray-900 text-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-yellow-300">
                ✨ {selectedConstellation.name}
              </h2>
              <button
                onClick={() => setSelectedConstellation(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-4">
              {constellationStories[selectedConstellation.name]}
            </p>

            <button
              onClick={() => setSelectedConstellation(null)}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
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
