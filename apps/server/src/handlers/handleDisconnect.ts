import { peerManager } from '@server/managers/PeerManager';
import { transportManager } from '@server/managers/TransportManager';
import type { WebSocket as WsSocket } from 'ws';

export function handleDisconnect(ws: WsSocket) {
  const userId = (ws as any).userId;
  if (!userId) return;

  transportManager.delete(userId);
  peerManager.remove(userId);
  //TODO producer 관련 처리
}
