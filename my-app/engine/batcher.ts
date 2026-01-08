import { DataBuffer } from "./databuffer";

interface Batcher {
  buffer: DataBuffer;
  batch: { avg: number; count: number };
}

export function handleworkerBatch({ buffer, batch }: Batcher) {
  buffer.push(batch.avg);
}
