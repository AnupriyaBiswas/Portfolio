import React, { useRef, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const canvasRef = useRef(null);
  const clickEffectRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let stars = [];
    let shootingStars = [];

    const STAR_COUNT = 200;

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
        ctx.lineTo(s.x - s.length * s.angleX, s.y + s.length * s.angleY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.closePath();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -100 || s.x > width + 100 || s.y > height + 100) {
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
      const angle = Math.random() * Math.PI / 4 + Math.PI / 8; // 22°–67°
      const speed = Math.random() * 5 + 4;
      const angleX = Math.cos(angle);
      const angleY = Math.sin(angle);

      shootingStars.push({
        x,
        y,
        vx: speed * angleX,
        vy: speed * angleY,
        angleX,
        angleY,
        length: Math.random() * 50 + 30,
      });

      // Play sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    const clickEffect = (x, y) => {
      const el = document.createElement("div");
      el.className =
        "fixed w-6 h-6 rounded-full bg-purple-500/40 border border-purple-300 pointer-events-none";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = "translate(-50%, -50%) scale(1)";
      el.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
      document.body.appendChild(el);

      setTimeout(() => {
        el.style.transform = "translate(-50%, -50%) scale(5)";
        el.style.opacity = "0";
      }, 0);

      setTimeout(() => {
        document.body.removeChild(el);
      }, 600);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleClick = (e) => {
      createShootingStar(e.clientX, e.clientY);
      clickEffect(e.clientX, e.clientY);
    };

    const meteorShower = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createShootingStar(
            Math.random() * width,
            Math.random() * (height / 3)
          );
        }, i * 300);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);
    animate();

    const showerInterval = setInterval(meteorShower, 15000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      clearInterval(showerInterval);
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

      {/* Shooting Star Sound */}
      <audio ref={audioRef} preload="auto" src="/assets/shooting.wav" />
    </div>
  );
};
