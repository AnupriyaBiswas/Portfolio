import React, { useEffect, useState } from "react";

const Background = () => {
  const [stars, setStars] = useState([]);
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

    // Generate 4-pointed sparkle stars
    const sparkles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 8,
      rotation: Math.random() * 360
    }));
    setSparkleStars(sparkles);

    // Function to create a single shooting star (the one with a tail)
    const createAutomaticShootingStar = () => {
      // Angle for diagonal movement (e.g., 315 degrees for top-right to bottom-left)
      const angle = 315;
      const angleRad = (angle * Math.PI) / 180;

      // Calculate travel distance to ensure it crosses the entire viewport
      // Diagonal of a 100vw x 100vh screen is sqrt(100^2 + 100^2) = 141.4.
      // A bit more to ensure it starts and ends fully off-screen.
      const travelDistance = 180;

      // Calculate end position based on angle
      const deltaX = Math.cos(angleRad) * travelDistance;
      const deltaY = Math.sin(angleRad) * travelDistance;

      const newShootingStar = {
        id: Date.now() + Math.random(),
        // Start X position, ensuring it starts off-screen or near the edge
        // For 315 degrees, it starts top-right and moves to bottom-left.
        // So, startX should be high (e.g., 90-100%)
        startX: 90 + Math.random() * 10, // Start from 90% to 100% of screen width
        startY: -5, // Start slightly above the viewport
        direction: {
          x: deltaX,
          y: deltaY
        },
        duration: 3 + Math.random() * 2 // Random duration for animation (3 to 5 seconds)
      };

      setShootingStars(prev => [...prev, newShootingStar]);

      // Remove shooting star after animation completes to prevent accumulation
      // Add a small buffer to ensure it's fully off-screen before removal
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, (newShootingStar.duration + 0.5) * 1000);
    };

    // Create first shooting star immediately after component mounts
    createAutomaticShootingStar();

    // Set up interval for periodic shooting stars
    const shootingInterval = setInterval(() => {
      createAutomaticShootingStar();
    }, 5000 + Math.random() * 3000); // Every 5-8 seconds

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

      {/* Shooting stars with fixed angle and aligned tail */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${shooting.startX}%`,
            top: `${shooting.startY}%`,
            zIndex: 10,
            // Custom CSS variables for animation
            '--end-x': `${shooting.direction.x}vw`,
            '--end-y': `${shooting.direction.y}vh`,
            animation: `shootingStarMove ${shooting.duration}s ease-out forwards`, // Apply animation to the parent container
          }}
        >
          {/* Shooting star head (a small dot) */}
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: '3px', // Small head for the shooting star
              height: '3px',
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
              transform: `rotate(${315}deg)`, // Tail angle should match the shooting star's path
              transformOrigin: '100% 50%', // Rotate around the right edge of the tail
              left: '-27px', // Align tail's right edge with head's center (3px head, so 1.5px center)
              top: '0.5px', // Align tail's vertical center with head's center (3px head, so 1.5px center)
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
