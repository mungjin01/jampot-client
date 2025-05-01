import type { WebSocket as WsSocket } from 'ws';
import mediasoup from 'mediasoup';
import type { RtpCapabilities } from 'mediasoup/node/lib/types';
import { transportManager } from '@server/managers/TransportManager';

const producers = new Map<string, mediasoup.types.Producer>();

export async function handleConsume(
  ws: WsSocket,
  data: { userId: string; rtpCapabilities: RtpCapabilities }
) {
  const recvTransport = transportManager.get(data.userId);
  if (!recvTransport) return;

  for (const [otherUserId, producer] of producers.entries()) {
    if (otherUserId === data.userId) continue;

    const consumer = await recvTransport.consume({
      producerId: producer.id,
      rtpCapabilities: data.rtpCapabilities,
      paused: false,
    });

    ws.send(
      JSON.stringify({
        type: 'consumed',
        data: {
          id: consumer.id,
          producerId: producer.id,
          userId: otherUserId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        },
      })
    );
  }
}
