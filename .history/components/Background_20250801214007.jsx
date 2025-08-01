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

    // Generate falling stars
    // Note: Falling stars will now be handled by a single CSS animation class.
    // We don't need a separate state for them, as they will be generated
    // by a loop inside the component.

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

    // Generate multiple shooting stars for continuous animation
    const newShootingStars = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      duration: 10 + Math.random() * 5, // Randomize duration
      delay: Math.random() * 15, // Staggered start
      top: Math.random() * 60, // Start from the top half of the screen
    }));
    setShootingStars(newShootingStars);
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

      {/* Falling stars - simplified to a single animation loop */}
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={`falling-${i}`}
          className="absolute bg-white rounded-full falling-star"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 20}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none"
          style={{
            top: `${shooting.top}%`,
            zIndex: 10,
            animation: `shootingStarMove ${shooting.duration}s linear infinite`,
            animationDelay: `${shooting.delay}s`,
          }}
        >
          {/* Shooting star tail */}
          <div className="shooting-star-tail" />
        </div>
      ))}

      {/* CSS animations */}
      <style jsx global>{`
        /* ... existing static and sparkle animations ... */

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }

        /* Corrected Falling Star Animation */
        .falling-star {
            width: 2px;
            height: 2px;
            opacity: 0;
            animation-name: fall;
        }

        @keyframes fall {
            0% {
                transform: translateY(-100vh);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        /* Corrected Shooting Star Animation */
        .shooting-star-tail {
            position: absolute;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.4) 70%, transparent 100%);
            transform: rotate(-45deg);
            transform-origin: 100% 50%;
        }

        @keyframes shootingStarMove {
            0% {
                transform: translateX(100vw);
            }
            100% {
                transform: translateX(-100vw);
            }
        }
      `}</style>
    </div>
  );
};

export default Background;