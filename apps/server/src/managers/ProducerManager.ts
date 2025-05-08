import type { Producer } from 'mediasoup/node/lib/types';

export class ProducerManager {
  private producers = new Map<string, Producer>();

  set(userId: string, producer: Producer) {
    this.producers.set(userId, producer);
  }

  get(userId: string) {
    return this.producers.get(userId);
  }

  getAll() {
    return Array.from(this.producers.entries());
  }

  delete(userId: string) {
    this.producers.delete(userId);
  }
}
