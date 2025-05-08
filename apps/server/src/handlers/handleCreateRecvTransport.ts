import { mediasoupConfig } from '@server/config/mediasoupConfig';
import { roomManager } from '@server/managers/RoomManager';

import type { WebSocket as WsSocket } from 'ws';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
  roomId?: string;
}

export async function handleCreateRecvTransport(ws: ExtendedWebSocket) {
  const room = roomManager.get(ws.roomId);
  if (!room || !ws.userId) return;

  const transport = await room.router.createWebRtcTransport(
    mediasoupConfig.webRtcTransport
  );

  room.transportManager.set(ws.userId, transport);

  ws.send(
    JSON.stringify({
      type: 'recvTransportCreated',
      data: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    })
  );
}
