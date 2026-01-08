import { DataPoint } from "./databuffer";


export function drawLineChart(
  data: DataPoint[],
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  if (data.length < 2) return;

  // Use the oldest points time as the start reference
  const oldestTime = data[0].time;
  const newestTime = data[data.length - 1].time;
  const duration = Math.max(newestTime - oldestTime, 1); // Avoid division by zero

  const max = 100;
  const min = 0;

  // Enable smooth rendering
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  ctx.beginPath();
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;

  // Calculate points - oldest on left, newest on right
  const points: { x: number; y: number }[] = [];
  for (const point of data) {
    // X position based on time relative to data range
    const x = ((point.time - oldestTime) / duration) * width;
    const y = height - ((point.value - min) / (max - min)) * height;
    points.push({ x, y });
  }

  // Draw smooth bezier curve through points
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    
    // Control point at midpoint for smooth curve
    const cpX = (current.x + next.x) / 2;
    const cpY = (current.y + next.y) / 2;
    
    ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
  }

  // Draw to the last point
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);

  ctx.stroke();
}
