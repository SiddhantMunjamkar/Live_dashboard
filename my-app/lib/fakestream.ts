let t = 0;

export function StartFakeStream(
  onData: (data: number) => void,
  ratepersecond: 1000
) {
  const interval = 1000 / ratepersecond;

  setInterval(() => {
    t += 0.05;
    const base = 50 + Math.sin(t) * 20;
    const noise = Math.random() * 5;
    onData(base + noise);
  }, interval);
}
