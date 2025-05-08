import type { WebSocket as WsSocket } from 'ws';
import type { DtlsParameters } from 'mediasoup/node/lib/types';
import { roomManager } from '@server/managers/RoomManager';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
  roomId?: string;
}

export async function handleConnectRecvTransport(
  ws: ExtendedWebSocket,
  dtlsParameters: DtlsParameters
) {
  const room = roomManager.get(ws.roomId);
  if (!room || !ws.userId) return;

  const transport = room.transportManager.get(ws.userId);
  if (!transport) return;

  await transport.connect({ dtlsParameters });
}
