import { WebSocketServer } from 'ws';
import type { WebSocket as WsSocket } from 'ws';
import { Server } from 'http';
import { handleMessage } from '@server/handlers/handleMessage';
import { handleDisconnect } from '@server/handlers/handleDisconnect';

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WsSocket) => {
    ws.on('message', (msg) => {
      const data = JSON.parse(msg.toString());
      handleMessage(ws, data);
    });

    ws.on('close', () => {
      handleDisconnect(ws);
    });
  });
}
