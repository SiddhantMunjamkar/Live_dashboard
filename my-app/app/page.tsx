
"use client";

import { useRef, useEffect } from "react";

export default function CanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const xRef = useRef(50);
  const vxRef = useRef(200); // px/sec

  useEffect(() => {
    const canvas = canvasRef.current!;
     const ctx = canvas.getContext("2d")!;

     canvas.width = 500;
     canvas.height = 500;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      xRef.current += vxRef.current * dt;

      if (xRef.current > 350 || xRef.current < 50) {
        vxRef.current *= -1;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(50, 200);
      ctx.lineTo(xRef.current, 200);
      ctx.strokeStyle = "blue";
      ctx.stroke();

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }, []);

  return <canvas ref={canvasRef} />;
}
