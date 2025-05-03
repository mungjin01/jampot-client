import type { Producer } from 'mediasoup/node/lib/types';

const producers = new Map<string, Producer>();

export const producerManager = {
  set: (userId: string, producer: Producer) => {
    producers.set(userId, producer);
  },
  get: (userId: string) => {
    return producers.get(userId);
  },
  getAll: () => {
    return Array.from(producers.entries());
  },
  delete: (userId: string) => {
    producers.delete(userId);
  },
};
