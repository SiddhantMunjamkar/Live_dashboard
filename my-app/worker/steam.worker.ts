let buffer: number[] = [];

const MAX_BUFFER_SIZE = 2;

self.onmessage = (event) => {
  buffer.push(event.data);
  // incoming data
  if (buffer.length >= MAX_BUFFER_SIZE) {
    const batch = buffer;
    buffer = [];

    const avg = batch.reduce((a, b) => a + b, 0) / batch.length;

    self.postMessage({
      avg,
      count: batch.length,
    });
  }
};
