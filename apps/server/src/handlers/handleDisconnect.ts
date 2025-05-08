import { roomManager } from '@server/managers/RoomManager';
import { WebSocket as WsSocket } from 'ws';

interface ExtendedWebSocket extends WsSocket {
  userId?: string;
  roomId?: string;
}

export function handleDisconnect(ws: ExtendedWebSocket) {
  const room = roomManager.get(ws.roomId);
  if (!room || !ws.userId) return;

  room.transportManager.delete(ws.userId);
  room.peerManager.remove(ws.userId);
  room.producerManager.delete(ws.userId);
}
