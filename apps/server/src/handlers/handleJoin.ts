import { peerManager } from '@server/managers/PeerManager';
import type { WebSocket as WsSocket } from 'ws';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
}

export function handleJoin(
  ws: ExtendedWebSocket,
  userInfo: { id: string; name: string; role: string }
) {
  ws.userId = userInfo.id;
  peerManager.add(userInfo.id, {
    ws,
    name: userInfo.name,
    role: userInfo.role,
  });

  const summary = peerManager.getAllSummaries();
  peerManager.broadcast('peerList', summary);
}
