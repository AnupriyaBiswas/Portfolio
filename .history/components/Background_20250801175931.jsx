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

    // Automatic shooting stars with randomized angles
    const createAutomaticShootingStar = () => {
      // Random angle between 15° and 165° (avoiding too steep or too shallow)
      const angle = 15 + Math.random() * 150;
      const angleRad = (angle * Math.PI) / 180;
      
      // Calculate travel distance (diagonal across screen)
      const distance = Math.sqrt(100 * 100 + 100 * 100); // ~141vw diagonal
      
      // Calculate end position based on angle
      const deltaX = Math.cos(angleRad) * distance;
      const deltaY = Math.sin(angleRad) * distance;

      const newShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100, // Random x position across top
        startY: -5, // Start slightly above screen
        deltaX: deltaX,
        deltaY: deltaY,
        duration: 2 + Math.random() * 1.5
      };

      setShootingStars(prev => [...prev, newShootingStar]);

      // Remove shooting star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, (newShootingStar.duration + 0.5) * 1000);
    };

    // Create first shooting star immediately
    createAutomaticShootingStar();

    // Set up interval for periodic shooting stars
    const shootingInterval = setInterval(() => {
      createAutomaticShootingStar();
    }, 2000 + Math.random() * 3000); // Every 2-5 seconds

    return () => {
      clearInterval(shootingInterval);
    };
  }, []);

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

      {/* Shooting stars with randomized angles from top */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${shooting.startX}%`,
            top: `${shooting.startY}%`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
              animation: `shootingStar-${shooting.id} ${shooting.duration}s ease-out forwards`,
            }}
          />
          {/* Individual keyframe for each shooting star with its calculated angle */}
          <style>{`
            @keyframes shootingStar-${shooting.id} {
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
                transform: translate(${shooting.deltaX}vw, ${shooting.deltaY}vh);
                opacity: 0;
              }
            }
          `}</style>
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
