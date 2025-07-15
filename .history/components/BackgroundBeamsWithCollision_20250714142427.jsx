import React, { useRef, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];

    canvas.width = width;
    canvas.height = height;

    const STAR_COUNT = 200;

    // Generate static stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        parallaxFactor: Math.random() * 0.5 + 0.5,
      });
    }

    const drawStars = (mouseX = width / 2, mouseY = height / 2) => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const offsetX = (mouseX - width / 2) * 0.01 * star.parallaxFactor;
        const offsetY = (mouseY - height / 2) * 0.01 * star.parallaxFactor;

        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.closePath();
      });
    };

    const handleMouseMove = (e) => {
      drawStars(e.clientX, e.clientY);
    };

    drawStars();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
};
