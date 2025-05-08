import type { WebSocket as WsSocket } from 'ws';
import { roomManager } from '@server/managers/RoomManager';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
  roomId?: string;
}

export async function handleJoin(
  ws: ExtendedWebSocket,
  data: {
    roomId: string;
    userInfo: { id: string; name: string; role: string };
  }
) {
  const { roomId, userInfo } = data;

  ws.userId = userInfo.id;
  ws.roomId = roomId;

  const room = await roomManager.getOrCreate(roomId);

  room.peerManager.add(userInfo.id, {
    ws,
    name: userInfo.name,
    role: userInfo.role,
  });

  const summary = room.peerManager.getAllSummaries();
  room.peerManager.broadcast('peerList', summary);

  console.log(`[peerManager][${roomId}]`, summary);
}
