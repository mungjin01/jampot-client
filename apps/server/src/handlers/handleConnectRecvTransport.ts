import { transportManager } from '@server/managers/TransportManager';
import type { WebSocket as WsSocket } from 'ws';
import type { DtlsParameters } from 'mediasoup/node/lib/types';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
}

export async function handleConnectRecvTransport(
  ws: ExtendedWebSocket,
  dtlsParameters: DtlsParameters
) {
  const userId = ws.userId;
  const transport = transportManager.get(userId);
  if (!transport) return;
  await transport.connect({ dtlsParameters });
}
