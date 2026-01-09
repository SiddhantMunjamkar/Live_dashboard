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

  ctx.beginPath();
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;

  // Spread points evenly across entire width using index position
  // This prevents vibration since positions are based on fixed indices
  const totalPoints = data.length;

  for (let i = 0; i < totalPoints; i++) {
    const x = (i / (totalPoints - 1)) * width;
    const y = height - ((data[i] - min) / (max - min)) * height;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}
