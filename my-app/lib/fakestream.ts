export function StartFakeStream(onData: (data: number) => void) {
  let running = true;

  function loop() {
    if (!running) {
      return;
    }
    const value = 50 + Math.sin(performance.now() / 300) * 20;
    onData(value);

    setTimeout(loop, 10);
  }
  loop();
  return () => {
    running = false;
  };
}
