export function drawLineChart(
  data: number[],
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  if (data.length < 2) return;

  const max = 100;
  const min = 0;


  // Enable smooth rendering
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Store path points for gradient fill
  const points: { x: number; y: number }[] = [];

  // Spread points evenly across entire width using index position
  // This prevents vibration since positions are based on fixed indices
  const totalPoints = data.length;

  for (let i = 0; i < totalPoints; i++) {
    const x = (i / (totalPoints - 1)) * width;
    const y = height - ((data[i] - min) / (max - min)) * height;
    points.push({ x, y });
  }

  // Draw gradient fill under the line
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(19, 236, 128, 0.2)");
  gradient.addColorStop(1, "rgba(19, 236, 128, 0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  // Close path to bottom for fill
  ctx.lineTo(points[points.length - 1].x, height);
  ctx.lineTo(points[0].x, height);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw glowing line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  // Add glow effect
  ctx.shadowColor = "rgba(19, 236, 128, 0.6)";
  ctx.shadowBlur = 8;
  ctx.strokeStyle = "#13ec80";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Reset shadow
  ctx.shadowBlur = 0;

  // Draw pulsing dot at the last point
  const lastPoint = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}
