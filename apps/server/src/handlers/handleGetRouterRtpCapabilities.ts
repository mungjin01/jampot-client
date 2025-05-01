import { router } from '@server/mediasoup';
import type { WebSocket as WsSocket } from 'ws';

export function handleGetRouterRtpCapabilities(ws: WsSocket): boolean {
  try {
    if (ws.readyState !== ws.OPEN) {
      console.error('WebSocket is not open');
      return false;
    }

    ws.send(
      JSON.stringify({
        type: 'routerRtpCapabilities',
        data: router.rtpCapabilities,
      })
    );
    return true;
  } catch (error) {
    console.error('Failed to send router RTP capabilities:', error);
    return false;
  }
}
