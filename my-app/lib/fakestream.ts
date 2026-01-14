import { stats } from "../engine/stats";

export function StartFakeStream(onData: (data: number) => void) {
  let running = true;

  function loop() {
    if (!running) {
      return;
    }
    const value = 50 + Math.sin(performance.now() / 300) * 20;
    stats.events++;
    stats.values.push(value);
    onData(value);


    
    setTimeout(loop, 10);
  }
  loop();
  return () => {
    running = false;
  };
}
