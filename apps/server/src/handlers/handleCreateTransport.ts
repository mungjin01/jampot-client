import { mediasoupConfig } from '@server/config/mediasoupConfig';
import { transportManager } from '@server/managers/TransportManager';
import { router } from '@server/mediasoup';
import type { WebSocket as WsSocket } from 'ws';

export async function handleCreateTransport(ws: WsSocket) {
  const transport = await router.createWebRtcTransport(
    mediasoupConfig.webRtcTransport
  );
  const userId = (ws as any).userId;
  transportManager.set(userId, transport);

  ws.send(
    JSON.stringify({
      type: 'transportCreated',
      data: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    })
  );
}
