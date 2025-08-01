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
    const falling = Array.from({ length: 120 }, (_, i) => ({
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

    // Periodic shooting star
    const shootingInterval = setInterval(() => {
      createShootingStar();
    }, 3000 + Math.random() * 4000);

    return () => {
      clearInterval(shootingInterval);
    };
  }, []);

  const createShootingStar = (clickX = null, clickY = null) => {
    const newShootingStar = {
      id: Date.now() + Math.random(),
      startX: clickX !== null ? clickX : Math.random() * 100,
      startY: clickY !== null ? clickY : Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: 1.5 + Math.random() * 1
    };

    setShootingStars(prev => [...prev, newShootingStar]);

    setTimeout(() => {
      setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
    }, (newShootingStar.duration + 0.5) * 1000);
  };

  const handleBackgroundClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    
    createShootingStar(clickX, clickY);
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden cursor-crosshair"
      style={{ zIndex: 0 }}
      onClick={handleBackgroundClick}
    >
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
          {/* 4-pointed star shape using CSS */}
          <div
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              background: 'white',
              position: 'relative',
              transform: 'rotate(45deg)',
            }}
          >
            {/* Diamond shape */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'white',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          </div>
          
          {/* Alternative approach - using before and after pseudo elements */}
          <div
            className="sparkle-star"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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

      {/* Shooting stars */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute"
          style={{
            left: `${shooting.startX}%`,
            top: `${shooting.startY}%`,
            width: "3px",
            height: "3px",
            zIndex: 2,
          }}
        >
          <div
            className="absolute bg-white rounded-full"
            style={{
              width: "3px",
              height: "3px",
              boxShadow: "0 0 6px #ffffff, 0 0 12px #ffffff",
              animation: `shootingStar ${shooting.duration}s ease-out forwards`,
              '--dx': `${shooting.endX - shooting.startX}vw`,
              '--dy': `${shooting.endY - shooting.startY}vh`,
            }}
          />
        </div>
      ))}

      {/* CSS animations and sparkle star styling */}
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
        
        @keyframes shootingStar {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx, 50vw), var(--dy, 50vh));
            opacity: 0;
          }
        }

        /* 4-pointed star shape using pseudo elements */
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
