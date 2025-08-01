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

    // Generate a single shooting star for the CSS animation
    const newShootingStar = {
      id: Date.now(),
      duration: 5 + Math.random() * 1.5,
      delay: Math.random() * 10,
      size: 1 + Math.random(),
    };
    setShootingStars([newShootingStar]);
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

      {/* Single shooting star with CSS animation for smooth loop */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none"
          style={{
            left: '100%',
            top: '0',
            zIndex: 10,
            animation: `shootingStarMove 10s linear infinite`,
          }}
        >
          {/* Shooting star tail */}
          <div
            style={{
              position: 'absolute',
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)',
              transform: 'rotate(-45deg)',
              transformOrigin: '100% 50%',
              left: '0',
              top: '0',
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
            transform: translate(-100vw, 100vh) rotate(-45deg);
          }
          100% {
            transform: translate(100vw, -100vh) rotate(-45deg);
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