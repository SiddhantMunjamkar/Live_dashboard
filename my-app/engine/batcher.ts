import { DataBuffer } from "./databuffer";
import { stats } from "../engine/stats";

interface Batcher {
  buffer: DataBuffer;
  batch: { avg: number; count: number };
}

export function handleworkerBatch({ buffer, batch }: Batcher) {
  stats.batches++;
  buffer.push(batch.avg);
}
