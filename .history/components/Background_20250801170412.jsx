import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

const constellationData = [
  {
    name: "Orion",
    stars: [
      { x: 50, y: 10 }, { x: 60, y: 20 }, { x: 55, y: 30 },
      { x: 45, y: 30 }, { x: 40, y: 20 }, { x: 50, y: 40 },
      { x: 60, y: 50 }
    ]
  },
  {
    name: "Ursa Major",
    stars: [
      { x: 20, y: 20 }, { x: 30, y: 15 }, { x: 40, y: 25 },
      { x: 50, y: 35 }, { x: 60, y: 25 }, { x: 70, y: 20 }, { x: 80, y: 30 }
    ]
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 70, y: 60 }, { x: 75, y: 55 }, { x: 80, y: 60 },
      { x: 85, y: 55 }, { x: 90, y: 60 }
    ]
  },
  {
    name: "Perseus",
    stars: [
      { x: 30, y: 70 }, { x: 35, y: 75 }, { x: 40, y: 72 },
      { x: 45, y: 78 }, { x: 50, y: 74 }, { x: 55, y: 79 }
    ]
  }
];

const constellationStories = {
  "Orion": "Orion was a giant and a boastful hunter in Greek mythology. He was the son of Poseidon and was known for his arrogance. In one of the most famous myths, he claimed he would kill every beast on Earth, which angered Gaia, the Earth goddess. She sent a giant scorpion to kill him. Orion fought the scorpion but was ultimately defeated by its sting. As a tribute to the battle, Zeus placed both Orion and the Scorpion in the night sky as constellations, forever chasing each other across the heavens.",
  "Cassiopeia": "In Greek mythology, Cassiopeia was the beautiful and vain queen of Aethiopia. She was so proud of her beauty that she boasted she was more beautiful than the Nereids, the sea nymphs. To punish her for this hubris, the sea god Poseidon sent a sea monster to ravage her kingdom. To appease the monster, Cassiopeia's daughter Andromeda was to be sacrificed. Cassiopeia was placed in the sky as a constellation, condemned to spin upside down on her throne for half the year as a constant reminder of her vanity.",
  "Ursa Major": "Greek mythology tells the story of Callisto, a beautiful nymph who was one of the goddess Artemis's followers. Zeus, the king of the gods, fell in love with her, which enraged his jealous wife, Hera. To punish Callisto, Hera turned her into a bear. Years later, Callisto's son, Arcas, was about to hunt and kill the bear, not knowing it was his mother. To prevent this tragedy, Zeus turned Arcas into a smaller bear and placed both mother and son in the sky as the constellations Ursa Major (the Great Bear) and Ursa Minor (the Little Bear), where they would be safe from Hera's wrath.",
  "Perseus": "Perseus was a great hero in Greek mythology, famous for slaying the Gorgon Medusa. With help from the gods, he obtained special items like a winged sandals and a reflective shield to help him complete his quest. On his way home, he saw the princess Andromeda chained to a rock, about to be sacrificed to a sea monster. He fell in love with her, turned the monster to stone with Medusa's head, and rescued her. Perseus and Andromeda later married, and both were honored with their own constellations, along with Andromeda's parents, Cassiopeia and Cepheus."
};

const Background = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);
  const [visibleConstellations, setVisibleConstellations] = useState([]);
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [hoveredConstellation, setHoveredConstellation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Generate static stars
    const staticStars = Array.from({ length: 250 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      twinkle: Math.random() * 5
    }));
    setStars(staticStars);

    // Generate falling stars
    const falling = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 10
    }));
    setFallingStars(falling);

    // Show first constellation immediately
    setVisibleConstellations([constellationData[0]]);

    // Cycle through constellations every 10 seconds
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % constellationData.length;
      setVisibleConstellations([constellationData[index]]);
    }, 10000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleConstellationClick = (constellation) => {
    console.log('Constellation clicked:', constellation.name);
    setSelectedConstellation(constellation);
  };

  const handleMouseEnter = (constellationName) => {
    if (!isMobile) {
      console.log('Hovering:', constellationName);
      setHoveredConstellation(constellationName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      console.log('Mouse left constellation');
      setHoveredConstellation(null);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Debug Display */}
      <div className="fixed top-4 left-4 bg-black bg-opacity-80 text-white p-2 text-xs rounded" style={{ zIndex: 1000 }}>
        <div>Hovered: {hoveredConstellation || 'None'}</div>
        <div>Selected: {selectedConstellation?.name || 'None'}</div>
        <div>Is Mobile: {isMobile.toString()}</div>
        <div>Visible: {visibleConstellations[0]?.name || 'None'}</div>
      </div>

      {/* Static stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${5 + s.twinkle}s infinite ease-in-out`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Falling stars */}
      {fallingStars.map((f) => (
        <div
          key={f.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: "2px",
            height: "2px",
            animation: `fall ${f.duration}s linear infinite`,
            animationDelay: `${f.delay}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Simplified Constellations - Using divs instead of SVG for better event handling */}
      {visibleConstellations.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="absolute animate-fade-in-out"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${20 + (i * 10)}%`,
            zIndex: 100,
          }}
        >
          {/* Clickable area - larger than the constellation */}
          <div
            className="relative cursor-pointer"
            style={{
              width: '300px',
              height: '200px',
              padding: '20px',
            }}
            onClick={() => handleConstellationClick(c)}
            onMouseEnter={() => handleMouseEnter(c.name)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Visual constellation using absolute positioned divs */}
            <div className="relative">
              {/* Draw constellation lines */}
              <svg 
                width="260" 
                height="160" 
                className="absolute top-0 left-0"
                style={{ pointerEvents: 'none' }}
              >
                {c.stars.map((star, j) =>
                  j < c.stars.length - 1 ? (
                    <line
                      key={`line-${j}`}
                      x1={star.x * 2}
                      y1={star.y * 1.3}
                      x2={c.stars[j + 1].x * 2}
                      y2={c.stars[j + 1].y * 1.3}
                      stroke="rgba(255, 255, 255, 0.5)"
                      strokeWidth="1.5"
                    />
                  ) : null
                )}
              </svg>
              
              {/* Draw stars as divs */}
              {c.stars.map((star, j) => (
                <div
                  key={j}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${star.x * 2}px`,
                    top: `${star.y * 1.3}px`,
                    width: '4px',
                    height: '4px',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
            
            {/* Tooltip */}
            {!isMobile && hoveredConstellation === c.name && (
              <div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded pointer-events-none whitespace-nowrap border border-gray-600 shadow-lg"
                style={{ zIndex: 200 }}
              >
                <div className="text-yellow-300 font-semibold">{c.name}</div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Portal Modal */}
      {selectedConstellation && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedConstellation(null);
            }
          }}
        >
          <div 
            style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              border: '1px solid #374151'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fcd34d', margin: 0 }}>
                ✨ {selectedConstellation.name}
              </h2>
              <button 
                onClick={() => {
                  console.log('X close button clicked!');
                  setSelectedConstellation(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ borderTop: '1px solid #374151', paddingTop: '16px', marginBottom: '16px' }}>
              <p style={{ color: '#d1d5db', lineHeight: '1.5', fontSize: '14px' }}>
                {constellationStories[selectedConstellation.name] || "No story available for this constellation."}
              </p>
            </div>
            
            <button 
              onClick={() => {
                console.log('Footer close button clicked!');
                setSelectedConstellation(null);
              }}
              style={{
                width: '100%',
                backgroundColor: '#d97706',
                color: 'black',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fall {
          0% { transform: translateY(-100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(-20px); opacity: 0; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-in-out {
          animation: fadeInOut 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Background;
