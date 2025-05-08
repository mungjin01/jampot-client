import type { WebRtcTransport } from 'mediasoup/node/lib/types';

export class TransportManager {
  private map = new Map<string, WebRtcTransport>();

  set(userId: string, transport: WebRtcTransport) {
    this.map.set(userId, transport);
  }

  get(userId: string) {
    return this.map.get(userId);
  }

  delete(userId: string) {
    this.map.delete(userId);
  }
}
