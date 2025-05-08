import * as mediasoup from 'mediasoup';
import { mediasoupConfig } from '@server/config/mediasoupConfig';
import { PeerManager } from './PeerManager';
import { ProducerManager } from './ProducerManager';
import { TransportManager } from './TransportManager';

type Room = {
  router: mediasoup.types.Router;
  peerManager: PeerManager;
  producerManager: ProducerManager;
  transportManager: TransportManager;
};

class RoomManager {
  private rooms = new Map<string, Room>();

  async getOrCreate(roomId: string): Promise<Room> {
    if (!this.rooms.has(roomId)) {
      const worker = await mediasoup.createWorker(mediasoupConfig.worker);
      const router = await worker.createRouter({
        mediaCodecs: [
          {
            kind: 'audio',
            mimeType: 'audio/opus',
            clockRate: 48000,
            channels: 2,
          },
        ],
      });

      const room: Room = {
        router,
        peerManager: new PeerManager(),
        producerManager: new ProducerManager(),
        transportManager: new TransportManager(),
      };

      this.rooms.set(roomId, room);
      console.log(`Room "${roomId}" 생성됨`);
    }

    return this.rooms.get(roomId)!;
  }

  get(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  delete(roomId: string) {
    this.rooms.delete(roomId);
  }

  getAllRoomIds(): string[] {
    return [...this.rooms.keys()];
  }
}

export const roomManager = new RoomManager();
