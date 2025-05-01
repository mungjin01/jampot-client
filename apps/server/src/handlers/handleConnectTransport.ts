import { transportManager } from '@server/managers/TransportManager';
import type { WebSocket as WsSocket } from 'ws';
import type { DtlsParameters } from 'mediasoup/node/lib/types';

export async function handleConnectTransport(
  ws: WsSocket,
  dtlsParameters: DtlsParameters
) {
  const userId = (ws as any).userId;
  const transport = transportManager.get(userId);
  if (!transport) return;
  await transport.connect({ dtlsParameters });
}
