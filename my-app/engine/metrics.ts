export class FPSCounter {
  private lastTime = performance.now();
  private frames = 0;
  private fps = 0;

  tick() {
    this.frames++;
    const now = performance.now();

    if (now - this.lastTime >= 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.lastTime = now;
    }
  }
}

