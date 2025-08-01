import React, { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const stars = [];
    const numberOfStars = 60; // Now you can easily change this without performance issues

    // Initialize stars with random positions
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update each star
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Update star position
        star.y += star.speed;

        // Reset star to top if it falls off the bottom
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Start animation
    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default CanvasBackground;