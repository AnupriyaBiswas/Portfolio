import React, { useEffect, useState } from "react";

const Background = () => {
  const [stars, setStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [crossStars, setCrossStars] = useState([]);

  useEffect(() => {
    // Generate static stars (increased from 250 to 400)
    const staticStars = Array.from({ length: 400 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() * 6
    }));
    setStars(staticStars);

    // Generate falling stars (increased from 40 to 60)
    const falling = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15
    }));
    setFallingStars(falling);

    // Generate cross/plus-shaped stars (new)
    const crosses = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 2,
      opacity: Math.random() * 0.7 + 0.3,
      twinkle: Math.random() * 8,
      rotation: Math.random() * 360
    }));
    setCrossStars(crosses);

    // Periodic shooting star
    const shootingInterval = setInterval(() => {
      createShootingStar();
    }, 3000 + Math.random() * 4000); // Every 3-7 seconds

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

    // Remove shooting star after animation
    setTimeout(() => {
      setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
    }, (newShootingStar.duration + 0.5) * 1000);
  };

  const handleBackgroundClick = (e) => {
    // Convert click position to percentage
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    
    console.log('Background clicked, creating shooting star at:', clickX, clickY);
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

      {/* Cross/Plus-shaped stars */}
      {crossStars.map((c) => (
        <div
          key={`cross-${c.id}`}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.size * 2}px`,
            height: `${c.size * 2}px`,
            opacity: c.opacity,
            animation: `twinkle ${6 + c.twinkle}s infinite ease-in-out`,
            transform: `translate(-50%, -50%) rotate(${c.rotation}deg)`,
            zIndex: 1,
          }}
        >
          {/* Horizontal line */}
          <div
            className="absolute bg-white"
            style={{
              left: '0%',
              top: '50%',
              width: '100%',
              height: '1px',
              transform: 'translateY(-50%)',
            }}
          />
          {/* Vertical line */}
          <div
            className="absolute bg-white"
            style={{
              left: '50%',
              top: '0%',
              width: '1px',
              height: '100%',
              transform: 'translateX(-50%)',
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
              animation: `shoot-${shooting.id} ${shooting.duration}s ease-out forwards`,
              boxShadow: "0 0 6px #ffffff, 0 0 12px #ffffff",
            }}
          />
          <style jsx>{`
            @keyframes shoot-${shooting.id} {
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
                transform: translate(${shooting.endX - shooting.startX}vw, ${shooting.endY - shooting.startY}vh);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      ))}

      {/* CSS Animations */}
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
      `}</style>
    </div>
  );
};

export default Background;
