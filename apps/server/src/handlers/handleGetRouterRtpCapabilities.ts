import { router } from '@server/mediasoup';
import type { WebSocket as WsSocket } from 'ws';

export function handleGetRouterRtpCapabilities(ws: WsSocket) {
  ws.send(
    JSON.stringify({
      type: 'routerRtpCapabilities',
      data: router.rtpCapabilities,
    })
  );
}
