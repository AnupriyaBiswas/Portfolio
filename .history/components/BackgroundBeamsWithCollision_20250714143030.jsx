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

  // Generate initial stars
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      parallaxFactor: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05, // very slow falling speed
    });
  }

  const drawStars = (mouseX = width / 2, mouseY = height / 2) => {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const offsetX = (mouseX - width / 2) * 0.01 * star.parallaxFactor;
      const offsetY = (mouseY - height / 2) * 0.01 * star.parallaxFactor;

      const x = star.x + offsetX;
      const y = star.y + offsetY;

      ctx.beginPath();
      ctx.arc(x, y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "white";
      ctx.fill();
      ctx.closePath();
    });
  };

  let mouse = { x: width / 2, y: height / 2 };

  const animate = () => {
    // update star positions
    stars.forEach((star) => {
      star.y += star.speed;
      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }
    });

    drawStars(mouse.x, mouse.y);
    requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    mouse = { x: e.clientX, y: e.clientY };
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  animate(); // start animation

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
