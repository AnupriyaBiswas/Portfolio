import React, { useEffect, useState } from "react";

const Background = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [sparkleStars, setSparkleStars] = useState([]);

  useEffect(() => {
    // Generate static stars
    const staticStars = Array.from({ length: 400 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() * 6
    }));
    setStars(staticStars);

    // Generate falling stars (vertical movement)
    const falling = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20, // Duration of fall
      delay: Math.random() * 15 // Staggered start
    }));
    setFallingStars(falling);

    // Generate 4-pointed sparkle stars
    const sparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 8,
      rotation: Math.random() * 360
    }));
    setSparkleStars(sparkles);

    // Create shooting stars with fixed 45-degree angle
    const createAutomaticShootingStar = () => {
      // Fixed angle at 45° for down-right movement
      const angle = 45;
      const angleRad = (angle * Math.PI) / 180;
      
      // Calculate travel distance to ensure it goes off-screen
      // A distance of 150 ensures it covers more than the diagonal of a 100vw x 100vh screen.
      const travelDistance = 150; 
      
      // Calculate end position based on 45° angle
      const deltaX = Math.cos(angleRad) * travelDistance; 
      const deltaY = Math.sin(angleRad) * travelDistance;

      const newShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100, // Random x position across top of the screen
        direction: {
          x: deltaX,
          y: deltaY
        },
        duration: 2 + Math.random() * 1.5 // Random duration for animation
      };

      setShootingStars(prev => [...prev, newShootingStar]);

      // Remove shooting star after animation completes to prevent accumulation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, (newShootingStar.duration + 0.5) * 1000); // Add a small buffer
    };

    // Create first shooting star immediately after component mounts
    setTimeout(createAutomaticShootingStar, 1000);

    // Set up interval for periodic shooting stars
    const shootingInterval = setInterval(() => {
      createAutomaticShootingStar();
    }, 3000 + Math.random() * 2000); // Every 3-5 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(shootingInterval);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Static round stars */}
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${4 + s.twinkle}s infinite ease-in-out`,
            zIndex: 1,
          }}
        />
      ))}

      {/* 4-pointed sparkle stars */}
      {sparkleStars.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            opacity: sparkle.opacity,
            animation: `sparkle ${6 + sparkle.twinkle}s infinite ease-in-out`,
            zIndex: 1,
          }}
        >
          <div
            className="sparkle-star"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
            }}
          />
        </div>
      ))}

      {/* Falling stars */}
      {fallingStars.map((f) => (
        <div
          key={`falling-${f.id}`}
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

      {/* Shooting stars with fixed 45-degree angle and aligned tail */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${shooting.startX}%`,
            top: '-5%', // Start slightly above the viewport to ensure full entry
            zIndex: 10,
            // Custom CSS variables for animation
            '--end-x': `${shooting.direction?.x || 60}vw`,
            '--end-y': `${shooting.direction?.y || 80}vh`,
            animation: `shootingStarMove ${shooting.duration}s ease-out forwards`, // Apply animation to the parent container
          }}
        >
          {/* Shooting star head (the bright leading point) */}
          <div
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: "0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px #ffffff",
              position: 'absolute', // Positioned relative to the parent div
              left: '0', 
              top: '0', 
              zIndex: 10,
            }}
          />
          {/* Shooting star tail (the fading trail) */}
          <div
            style={{
              position: 'absolute',
              width: '30px', // Length of the tail
              height: '2px', // Thickness of the tail
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)',
              // Rotate the tail 225 degrees (45 degrees + 180 degrees) so it points backwards along the 45-degree trajectory.
              transform: `rotate(225deg)`, 
              // Set the transform origin to the right edge of the tail (100% of its width)
              // This ensures the tail rotates around the point where it connects to the head.
              transformOrigin: '100% 50%', 
              // Adjust left and top to align the tail's right edge with the center of the 5x5 head.
              // Head center is at (2.5px, 2.5px) relative to its container.
              // Tail's right edge should be at (2.5px, 2.5px).
              // Tail width is 30px, so its left edge is 30px to the left of its right edge.
              // Tail height is 2px, so its vertical center is 1px from its top edge.
              left: '-27.5px', // 2.5px (head center x) - 30px (tail width) = -27.5px
              top: '1.5px', // 2.5px (head center y) - 1px (tail half height) = 1.5px
              zIndex: 9,
            }}
          />
        </div>
      ))}

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }
        
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.8) rotate(0deg);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2) rotate(180deg);
          }
        }
        
        @keyframes fall {
          0% { 
            transform: translateY(-100vh) translateX(0); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(100vh) translateX(-30px); 
            opacity: 0; 
          }
        }

        @keyframes shootingStarMove {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y));
            opacity: 0;
          }
        }

        /* 4-pointed star shape using pseudo elements */
        .sparkle-star {
          position: relative;
        }
        
        .sparkle-star::before,
        .sparkle-star::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
        }
        
        .sparkle-star::before {
          width: 100%;
          height: 2px;
        }
        
        .sparkle-star::after {
          width: 2px;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Background;
