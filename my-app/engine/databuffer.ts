export class DataBuffer {
  private buffer: number[];
  private index = 0;
  private filled = false;
  private maxsize: number;

  constructor(maxsize: 1000) {
    this.maxsize = maxsize;
    this.buffer = new Array(maxsize);
  }

  push(value: number) {
    this.buffer[this.index] = value;
    this.index = (this.index + 1) % this.maxsize;
    if (this.index === 0) this.filled = true;
  }

  getsnapshot(): number[] {
    if (!this.filled) {
      return this.buffer.slice(0, this.index);
    }

    return [
      ...this.buffer.slice(this.index),
      ...this.buffer.slice(0, this.index),
    ];
  }
}
