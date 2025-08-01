import React, { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const stars = [];
    const numberOfStars = 150; // You can adjust this number for density

    // Initialize stars with random positions and properties
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2, // Random speed for varied falling
        size: Math.random() * 1.5 + 0.5 // Random size for varied appearance
      });
    }

    // Function to handle canvas resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize star positions if canvas size changes significantly
      // Or simply let them wrap around as they fall
    };

    // Set initial canvas dimensions
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      // Clear the canvas for the next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update each star
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Draw the star (a simple white circle)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Update star position (move downwards)
        star.y += star.speed;

        // If star goes off the bottom, reset it to the top with a new random X
        if (star.y > canvas.height) {
          star.y = 0; // Reset to top
          star.x = Math.random() * canvas.width; // New random horizontal position
        }
      }

      // Request the next animation frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Cleanup function: remove event listener and cancel animation frame
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array means this effect runs once on mount/unmount

  return (
    <canvas
      ref={canvasRef}
      // Position the canvas absolutely to cover the entire background
      // Set zIndex to be behind your main content
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
};

export default CanvasBackground;
