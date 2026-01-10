"use client";

import { useEffect, useRef } from "react";
import { DataBuffer } from "@/engine/databuffer";
import { drawLineChart } from "@/engine/renderer";
import { startRenderloop } from "@/engine/scheduler";
import { FPSCounter } from "@/engine/metrics";
import { StartFakeStream } from "@/lib/fakestream";
import { shouldDropFrame } from "@/engine/backpressure";
import { handleworkerBatch } from "@/engine/batcher";
import { stats } from "@/engine/stats";

export default function ChartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Set canvas dimensions based on container
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();

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
      drawLineChart(snapshot, ctx, canvas.width, canvas.height);
      fpsRef.current.tick();
      
      // Update global stats with FPS
      stats.fps = fpsRef.current.fps;
    });

    return () => {
      stream?.(); // stop the fake stream
      stopRender();
      Newworker.terminate();
     
      // resetFrame();
    };
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-0 flex flex-col relative overflow-hidden min-h-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400 text-sm"></span>
          <h2 className="text-sm font-bold text-slate-200">Incoming Traffic</h2>
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-400 rounded hover:bg-slate-700 transition">
            1h
          </button>
          <button className="px-2 py-1 text-xs font-medium  bg-slate-800 text-slate-400 border border-primary/30 rounded">
            10m
          </button>
          <button className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-400 rounded hover:bg-slate-700 transition">
            1m
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative flex-1 w-full h-full p-4">
        {/* Grid Lines Background */}
        <div className="absolute left-12 right-4 top-4 bottom-10 z-0 border-l border-b border-slate-800/50 flex flex-col justify-between">
          <div className="w-full h-px bg-slate-800/30"></div>
          <div className="w-full h-px bg-slate-800/30"></div>
          <div className="w-full h-px bg-slate-800/30"></div>
          <div className="w-full h-px bg-slate-800/30"></div>
        </div>

        {/* Canvas - matches grid area */}
        <div
          ref={containerRef}
          className="absolute left-12 right-4 top-4 bottom-10 z-10"
        >
          <canvas
            className="w-full h-full"
            ref={canvasRef}
            style={{ display: "block" }}
          />
        </div>

        {/* Y-Axis Labels */}
        <div className="absolute left-3 top-4 bottom-10 flex flex-col justify-between text-[10px] text-slate-500 font-mono pointer-events-none z-20">
          <span>100ms</span>
          <span>75ms</span>
          <span>50ms</span>
          <span>25ms</span>
          <span>0ms</span>
        </div>
      </div>
    </div>
  );
}
