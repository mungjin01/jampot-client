import { peerManager } from '@server/managers/PeerManager';
import { transportManager } from '@server/managers/TransportManager';

import { WebSocket as WsSocket } from 'ws';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
}

export function handleDisconnect(ws: ExtendedWebSocket) {
  const userId = ws.userId;
  if (!userId) return;

  transportManager.delete(userId);
  peerManager.remove(userId);
  //TODO producer 관련 처리
}
