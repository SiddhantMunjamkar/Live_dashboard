"use client";

import { useEffect, useRef } from "react";
import { DataBuffer } from "@/engine/databuffer";
import { drawLineChart } from "@/engine/renderer";
import { startRenderloop } from "@/engine/scheduler";
import { FPSCounter } from "@/engine/metrics";
import { StartFakeStream } from "@/lib/fakestream";
import {  shouldDropFrame } from "@/engine/backpressure";
import { handleworkerBatch } from "@/engine/batcher";

export default function ChartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferRef = useRef(new DataBuffer(300));
  const fpsRef = useRef(new FPSCounter());
  const workerRef = useRef<Worker | null>(null);

  const lastRenderTimeRef = useRef(0);

  useEffect(() => {
    const Newworker = new Worker(
      new URL("../worker/steam.worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = Newworker;

    Newworker.onmessage = (event) => {
      // Always accept incoming data into buffer
      handleworkerBatch({
        buffer: bufferRef.current,
        batch: event.data,
      });
    };

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stream = StartFakeStream((value: number) => {
      Newworker.postMessage(value);
    }) as (() => void) | undefined;

    const stopRender = startRenderloop(() => {
      // Apply backpressure: skip render if last render was too recent (throttle to ~60fps)
      if (shouldDropFrame(lastRenderTimeRef.current, 16)) {
        return;
      }

      lastRenderTimeRef.current = performance.now();
      
      // Get timestamped data and render with time-based positioning
      const snapshot = bufferRef.current.getsnapshot();
      drawLineChart(
        snapshot,
        ctx,
        canvas.width,
        canvas.height
      );
      fpsRef.current.tick();
    });

    return () => {
      stream?.(); // stop the fake stream
      stopRender();
      Newworker.terminate();
      // resetFrame();
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
