export function drawLineChart(
  data: number[],
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  if (data.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = "#22c55e";


  
  ctx.lineWidth = 2;

  const max = Math.max(...data);
  const min = Math.min(...data);

  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}
