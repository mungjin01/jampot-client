import type { WebSocket as WsSocket } from 'ws';
import type { RtpCapabilities } from 'mediasoup/node/lib/types';

import { roomManager } from '@server/managers/RoomManager';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
  roomId?: string;
}

export async function handleConsume(
  ws: ExtendedWebSocket,
  data: { rtpCapabilities: RtpCapabilities }
) {
  const room = roomManager.get(ws.roomId);
  if (!room || !ws.userId) return;

  const recvTransport = room.transportManager.get(ws.userId);
  if (!recvTransport) return;

  for (const [otherUserId, producer] of room.producerManager.getAll()) {
    if (otherUserId === ws.userId) continue;

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
