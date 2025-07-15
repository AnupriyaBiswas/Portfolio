import React, { useRef, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let stars = [];
    let shootingStars = [];
    const audio = new Audio("/assets/shooting.mp3");

    const STAR_COUNT = 200;

    // Static stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.2 + 0.05,
      });
    }

    const drawStars = () => {
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.closePath();

        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((s, index) => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length * Math.cos(s.angle), s.y + s.length * Math.sin(s.angle));
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.closePath();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -50 || s.x > width + 50 || s.y > height + 50 || s.y < -50) {
          shootingStars.splice(index, 1);
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawStars();
      drawShootingStars();
      requestAnimationFrame(animate);
    };

    const createShootingStar = (x, y) => {
      const angle = Math.random() * (Math.PI / 3) + Math.PI / 10; // angle between 18° and 78°
      const speed = Math.random() * 5 + 3; // speed between 3 and 8
      const vx = Math.cos(angle) * speed * -1; // left-up
      const vy = Math.sin(angle) * speed;

      shootingStars.push({
        x,
        y,
        vx,
        vy,
        angle,
        length: Math.random() * 50 + 40,
      });

      // Play sound
      try {
        audio.currentTime = 0;
        audio.play();
      } catch (e) {
        console.warn("Shooting star sound failed to play:", e);
      }
    };

    const createMeteorShower = () => {
      const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 meteors
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.5; // top half only
        setTimeout(() => createShootingStar(x, y), i * 200); // delay each meteor slightly
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleClick = (e) => {
      createShootingStar(e.clientX, e.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);

    // Start animation
    animate();

    // Meteor shower every 15s
    const meteorInterval = setInterval(() => {
      createMeteorShower();
    }, 15000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      clearInterval(meteorInterval);
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
