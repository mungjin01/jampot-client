import { peerManager } from '@server/managers/PeerManager';
import type { WebSocket as WsSocket } from 'ws';

export function handleJoin(
  ws: WsSocket,
  userInfo: { id: string; name: string; role: string }
) {
  (ws as any).userId = userInfo.id;
  peerManager.add(userInfo.id, {
    ws,
    name: userInfo.name,
    role: userInfo.role,
  });

  const summary = peerManager.getAllSummaries();
  peerManager.broadcast('peerList', summary);
}
