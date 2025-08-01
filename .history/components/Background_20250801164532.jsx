import React, { useEffect, useState } from "react";

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
  const [constellationPositions, setConstellationPositions] = useState([]);

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

    // Generate fixed positions for constellations (no random positioning)
    const positions = constellationData.map((_, index) => ({
      left: 15 + (index * 20) % 60,
      top: 15 + Math.floor(index / 3) * 25
    }));
    setConstellationPositions(positions);

    // Show first constellation immediately
    setVisibleConstellations([constellationData[0]]);

    // Cycle through constellations every 10 seconds
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % constellationData.length;
      setVisibleConstellations([constellationData[index]]);
    }, 10000); // Changed to 10 seconds
    
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
      {/* Debug Display - Remove this after testing */}
      <div className="fixed top-4 left-4 bg-black bg-opacity-80 text-white p-2 text-xs rounded" style={{ zIndex: 1000 }}>
        <div>Hovered: {hoveredConstellation || 'None'}</div>
        <div>Selected: {selectedConstellation?.name || 'None'}</div>
        <div>Is Mobile: {isMobile.toString()}</div>
        <div>Visible Constellations: {visibleConstellations.length}</div>
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

      {/* Constellations - Fixed positioning, better event handling */}
      {visibleConstellations.map((c, i) => {
        const position = constellationPositions[constellationData.findIndex(constellation => constellation.name === c.name)] || { left: 25, top: 25 };
        
        return (
          <div
            key={`${c.name}-${i}`}
            className="absolute animate-fade-in-out"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
              zIndex: 100,
              pointerEvents: 'auto'
            }}
          >
            <div
              className="relative cursor-pointer bg-transparent"
              style={{
                padding: '20px',
                pointerEvents: 'auto'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleConstellationClick(c);
              }}
              onMouseEnter={(e) => {
                e.preventDefault();
                handleMouseEnter(c.name);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                handleMouseLeave();
              }}
            >
              <svg 
                width="200" 
                height="200" 
                className="overflow-visible"
                style={{ 
                  pointerEvents: 'none',
                  display: 'block'
                }}
              >
                {/* Draw constellation lines first (behind stars) */}
                {c.stars.map((star, j) =>
                  j < c.stars.length - 1 ? (
                    <line
                      key={`line-${j}`}
                      x1={star.x * 1.5}
                      y1={star.y * 1.5}
                      x2={c.stars[j + 1].x * 1.5}
                      y2={c.stars[j + 1].y * 1.5}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1.5"
                    />
                  ) : null
                )}
                
                {/* Draw stars on top */}
                {c.stars.map((star, j) => (
                  <circle
                    key={j}
                    cx={star.x * 1.5}
                    cy={star.y * 1.5}
                    r="2"
                    fill="rgba(255, 255, 255, 0.9)"
                  />
                ))}
              </svg>
              
              {/* Improved tooltip */}
              {!isMobile && hoveredConstellation === c.name && (
                <div 
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded pointer-events-none whitespace-nowrap border border-gray-600 shadow-lg"
                  style={{ zIndex: 200 }}
                >
                  <div className="text-yellow-300 font-semibold">{c.name}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Enhanced Modal for constellation stories */}
      {selectedConstellation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
          style={{ zIndex: 1000 }}
          onClick={() => setSelectedConstellation(null)}
        >
          <div 
            className="bg-gray-900 text-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-yellow-300 flex items-center">
                <span className="mr-2">✨</span>
                {selectedConstellation.name}
              </h2>
              <button 
                onClick={() => setSelectedConstellation(null)}
                className="text-gray-400 hover:text-white text-2xl font-bold transition-colors duration-200 hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-300 leading-relaxed text-sm">
                {constellationStories[selectedConstellation.name]}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button 
                onClick={() => setSelectedConstellation(null)}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Updated CSS Animations */}
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
        .constellation-container:hover svg circle {
          fill: rgba(255, 255, 0, 0.9) !important;
        }
        .constellation-container:hover svg line {
          stroke: rgba(255, 255, 0, 0.6) !important;
          stroke-width: 2;
        }
      `}</style>
    </div>
  );
};

export default Background;
