import React, { useState } from "react";
import { createPortal } from 'react-dom';

const constellationStories = {
  "Test": "This is a test constellation to verify functionality.",
  "Orion": "Orion was a giant and a boastful hunter in Greek mythology. He was the son of Poseidon and was known for his arrogance. In one of the most famous myths, he claimed he would kill every beast on Earth, which angered Gaia, the Earth goddess. She sent a giant scorpion to kill him. Orion fought the scorpion but was ultimately defeated by its sting. As a tribute to the battle, Zeus placed both Orion and the Scorpion in the night sky as constellations, forever chasing each other across the heavens."
};

const Background = () => {
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [hoveredConstellation, setHoveredConstellation] = useState(null);

  console.log('Component rendered - Selected:', selectedConstellation?.name, 'Hovered:', hoveredConstellation);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#000020',
      overflow: 'hidden'
    }}>
      {/* Debug Display */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        fontSize: '12px',
        borderRadius: '4px',
        zIndex: 10000
      }}>
        <div>Hovered: {hoveredConstellation || 'None'}</div>
        <div>Selected: {selectedConstellation?.name || 'None'}</div>
        <div>Component Active: ✓</div>
      </div>

      {/* Simple Test Constellation - Large Clickable Area */}
      <div
        style={{
          position: 'absolute',
          top: '200px',
          left: '300px',
          width: '400px',
          height: '300px',
          border: '2px dashed rgba(255,255,255,0.3)',
          borderRadius: '10px',
          cursor: 'pointer',
          backgroundColor: hoveredConstellation === 'Test' ? 'rgba(255,255,0,0.1)' : 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
          textAlign: 'center',
          zIndex: 100
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('CONSTELLATION CLICKED!');
          setSelectedConstellation({ name: 'Test' });
        }}
        onMouseEnter={() => {
          console.log('MOUSE ENTERED CONSTELLATION!');
          setHoveredConstellation('Test');
        }}
        onMouseLeave={() => {
          console.log('MOUSE LEFT CONSTELLATION!');
          setHoveredConstellation(null);
        }}
      >
        <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>
          TEST CONSTELLATION
        </div>
        <div style={{ marginBottom: '10px' }}>
          ⭐ ⭐ ⭐
        </div>
        <div style={{ marginBottom: '10px' }}>
          ⭐     ⭐
        </div>
        <div>
          ⭐ ⭐
        </div>
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#ccc' }}>
          {hoveredConstellation === 'Test' ? 'CLICK TO OPEN STORY!' : 'Hover over me!'}
        </div>
      </div>

      {/* Additional Test Areas */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          right: '100px',
          width: '200px',
          height: '100px',
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '8px'
        }}
        onClick={() => {
          console.log('RED BOX CLICKED!');
          setSelectedConstellation({ name: 'Orion' });
        }}
      >
        CLICK FOR ORION
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '100px',
          width: '200px',
          height: '100px',
          backgroundColor: 'blue',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '8px'
        }}
        onMouseEnter={() => {
          console.log('BLUE BOX HOVERED!');
          setHoveredConstellation('Blue Test');
        }}
        onMouseLeave={() => {
          console.log('BLUE BOX LEFT!');
          setHoveredConstellation(null);
        }}
      >
        HOVER TEST
      </div>

      {/* Portal Modal */}
      {selectedConstellation && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              console.log('Backdrop clicked, closing modal');
              setSelectedConstellation(null);
            }
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '30px',
              borderRadius: '10px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '20px', color: '#333' }}>
              ✨ {selectedConstellation.name} ✨
            </h2>
            
            <p style={{ marginBottom: '30px', lineHeight: '1.6' }}>
              {constellationStories[selectedConstellation.name] || "Test constellation story."}
            </p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={() => {
                  console.log('CLOSE BUTTON 1 CLICKED!');
                  setSelectedConstellation(null);
                }}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Close (Button 1)
              </button>
              
              <button 
                onClick={() => {
                  console.log('CLOSE BUTTON 2 CLICKED!');
                  setSelectedConstellation(null);
                }}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Close (Button 2)
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Background;
