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
      twinkle: Math.random() * 6,
    }));
    setStars(staticStars);

    // Generate falling stars
    const falling = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15,
    }));
    setFallingStars(falling);

    // Generate sparkle stars
    const sparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setSparkleStars(sparkles);

    // Automatic shooting stars
    const createAutomaticShootingStar = () => {
      const angle = 130;
      const angleRad = (angle * Math.PI) / 180;
      const travelDistance = 150;

      const deltaX = Math.cos(angleRad) * travelDistance;
      const deltaY = Math.sin(angleRad) * travelDistance;

      const newShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * (75 - 25) + 25,
        direction: {
          x: deltaX,
          y: deltaY,
        },
        duration: 5 + Math.random() * 1.5,
      };

      setShootingStars((prev) => [...prev, newShootingStar]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, (newShootingStar.duration + 0.5) * 1000);
    };

    setTimeout(createAutomaticShootingStar, 1000);

    const shootingInterval = setInterval(() => {
      createAutomaticShootingStar();
    }, 5000 + Math.random() * 2000);

    return () => {
      clearInterval(shootingInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Static stars */}
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${4 + s.twinkle}s`,
          }}
        />
      ))}

      {/* Sparkle stars */}
      {sparkleStars.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            opacity: sparkle.opacity,
            animationDuration: `${6 + sparkle.twinkle}s`,
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
          className="absolute bg-white rounded-full animate-fall"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: "2px",
            height: "2px",
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shooting) => (
        <div
          key={`shooting-${shooting.id}`}
          className="absolute pointer-events-none animate-shootingStarMove"
          style={{
            left: `${shooting.startX}%`,
            top: "-5%",
            "--end-x": `${shooting.direction?.x || 60}vw`,
            "--end-y": `${shooting.direction?.y || 80}vh`,
            animationDuration: `${shooting.duration}s`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "30px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)",
              transform: "rotate(310deg)",
              transformOrigin: "100% 50%",
              left: "-27.5px",
              top: "1.5px",
              zIndex: 9,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Background;
