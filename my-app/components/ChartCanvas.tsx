"use client";

import { useEffect, useRef } from "react";
import { DataBuffer } from "@/engine/databuffer";
import { drawLineChart } from "@/engine/renderer";
import { startRenderloop } from "@/engine/scheduler";
import { FPSCounter } from "@/engine/metrics";
import { StartFakeStream } from "@/lib/fakestream";

export default function ChartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferRef = useRef(new DataBuffer(300));
  const fpsRef = useRef(new FPSCounter());

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    StartFakeStream((value: number) => {
      bufferRef.current.push(value);
    }, 1000);

    const stopRender = startRenderloop(() => {
      drawLineChart(
        bufferRef.current.getsnapshot(),
        ctx,
        canvas.width,
        canvas.height
      );
      fpsRef.current.tick();
    });

    return () => {
      stopRender();
    };
  }, []);

  return (
    <canvas
      className="w-full h-[400px] bg-black rounded-md"
      ref={canvasRef}
      style={{ width: "100%", height: "300px" }}
    />
  );
}
