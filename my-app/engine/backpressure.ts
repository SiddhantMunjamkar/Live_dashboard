import { stats } from "../engine/stats";

export function shouldDropFrame(lastRenderTime: number, threshold: number) {
  // Skip render if less than threshold milliseconds have passed since last render
  stats.dropped++;
  return performance.now() - lastRenderTime < threshold;
}

// export function resetFrame() {
//   // Not needed with time-based approach
// }
