export interface DataPoint {
  time: number;
  value: number;
}

export class DataBuffer {
  private buffer: DataPoint[];
  private index = 0;
  private filled = false;
  private maxsize: number;

  constructor(maxsize: number) {
    this.maxsize = maxsize;
    this.buffer = new Array(maxsize);
  }

  push(value: number) {
    this.buffer[this.index] = {
      time: performance.now(),
      value: value
    };
    this.index = (this.index + 1) % this.maxsize;
    if (this.index === 0) this.filled = true;
  }

  getsnapshot(): DataPoint[] {
    if (!this.filled) {
      return this.buffer.slice(0, this.index).filter(Boolean);
    }

    return [
      ...this.buffer.slice(this.index),
      ...this.buffer.slice(0, this.index),
    ].filter(Boolean);
  }
}
