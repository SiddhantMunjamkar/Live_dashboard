export function startRenderloop(render: () => void) {
  let running = true;

  function loop() {
    if (!running) return;
    render();
    
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  return () => {
    running = false;
  };
}
