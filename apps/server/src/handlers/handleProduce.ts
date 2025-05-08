import type { WebSocket as WsSocket } from 'ws';
import type { MediaKind, RtpParameters } from 'mediasoup/node/lib/types';

import { roomManager } from '@server/managers/RoomManager';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
  roomId?: string;
}

export async function handleProduce(
  ws: ExtendedWebSocket,
  data: { kind: MediaKind; rtpParameters: RtpParameters }
) {
  const room = roomManager.get(ws.roomId);
  if (!room || !ws.userId) return;

  const transport = room.transportManager.get(ws.userId);
  if (!transport) return;

  const producer = await transport.produce({
    kind: data.kind,
    rtpParameters: data.rtpParameters,
  });

  room.producerManager.set(ws.userId, producer);

  ws.send(JSON.stringify({ type: 'produced', id: producer.id }));

  for (const [peerId, peer] of room.peerManager.entries) {
    if (peerId === ws.userId) continue;
    peer.ws.send(JSON.stringify({ type: 'newProducer', userId: ws.userId }));
  }
}
