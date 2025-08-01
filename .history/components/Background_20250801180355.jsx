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

    // Generate falling stars
    const falling = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15
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

    // Predefined diagonal directions for variety
    const directions = [
      { x: 60, y: 80 },   // Down-right
      { x: 80, y: 70 },   // More right
      { x: 40, y: 90 },   // More down
      { x: 70, y: 60 },   // Steep right
      { x: 30, y: 80 },   // Left-down
      { x: 90, y: 50 },   // Far right
    ];

    // Create shooting stars with multiple predefined directions
    const createAutomaticShootingStar = () => {
      const selectedDirection = directions[Math.floor(Math.random() * directions.length)];

      const newShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100, // Random x position across top
        direction: {
          x: selectedDirection.x,
          y: selectedDirection.y
        },
        duration: 2 + Math.random() * 1.5
      };

      console.log('Creating shooting star:', newShootingStar);
      setShootingStars(prev => [...prev, newShootingStar]);

      // Remove shooting star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, (newShootingStar.duration + 0.5) * 1000);
    };

    // Create first shooting star immediately
    setTimeout(createAutomaticShootingStar, 1000);

    // Set up interval for periodic shooting stars
    const shootingInterval = setInterval(() => {
      createAutomaticShootingStar();
    }, 3000 + Math.random() * 2000); // Every 3-5 seconds

    return () => {
      clearInterval(shootingInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Debug info */}
      <div className="fixed top-4 left-4 bg-black bg-opacity-70 text-white p-2 text-xs rounded z-50">
        <div>Active Shooting Stars: {shootingStars.length}</div>
        <div>Next shooting star in ~3-5 seconds</div>
      </div>

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

      {/* Shooting stars - Fixed with proper direction object */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${shooting.startX}%`,
            top: '-5%',
            zIndex: 10,
            '--end-x': `${shooting.direction?.x || 60}vw`,
            '--end-y': `${shooting.direction?.y || 80}vh`,
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: "0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px #ffffff",
              animation: `shootingStarMove ${shooting.duration}s ease-out forwards`,
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
