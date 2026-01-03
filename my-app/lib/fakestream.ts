export function StartFakeStream(
  onData: (data: number) => void,
  ratepersecond: 1000
) {
  const interval = 1000 / ratepersecond;

  setInterval(() => {
    const fakeData = 20 + Math.random() * 80;
    onData(fakeData);
  }, interval);
}
