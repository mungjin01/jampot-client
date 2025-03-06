import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const peers = new Map<string, WebSocket>();

wss.on('connection', (ws) => {
  let userId: string | null = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === 'join') {
      userId = data.userId;
      peers.set(userId, ws);
      console.log(`User joined: ${userId}`);
    } else if (data.type === 'signal' && data.targetId) {
      const targetWs = peers.get(data.targetId);
      if (targetWs) {
        targetWs.send(
          JSON.stringify({ type: 'signal', from: userId, sdp: data.sdp })
        );
      }
    }
  });

  ws.on('close', () => {
    if (userId) {
      peers.delete(userId);
      console.log(`User disconnected: ${userId}`);
    }
  });
});

console.log('WebSocket Server running on ws://localhost:8080');
