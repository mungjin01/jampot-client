import mediasoup from 'mediasoup';

class TransportManager {
  private map = new Map<string, mediasoup.types.WebRtcTransport>();

  set(userId: string, transport: mediasoup.types.WebRtcTransport) {
    this.map.set(userId, transport);
  }

  get(userId: string) {
    return this.map.get(userId);
  }

  delete(userId: string) {
    this.map.delete(userId);
  }
}

export const transportManager = new TransportManager();
