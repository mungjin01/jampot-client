import { mediasoupConfig } from '@server/config/mediasoupConfig';
import { transportManager } from '@server/managers/TransportManager';
import { router } from '@server/mediasoup';
import type { WebSocket as WsSocket } from 'ws';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
}

export async function handleCreateRecvTransport(ws: ExtendedWebSocket) {
  const transport = await router.createWebRtcTransport(
    mediasoupConfig.webRtcTransport
  );
  const userId = ws.userId;
  transportManager.set(userId, transport);

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
