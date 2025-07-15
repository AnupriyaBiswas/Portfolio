import React, { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn"; // optional helper if you use one

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  const STAR_COUNT = 150;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setStars(generateStars());
    };

    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
      return starArray;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const clearRadius = 80;
        if (distance > clearRadius) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [stars, mouse]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Star Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ background: "#0a0a23" }}
      />

      {/* Glow Beams Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-48 bg-gradient-to-t from-purple-500 via-indigo-500 to-transparent animate-pulse"
            style={{
              left: `${(i / 10) * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};
