import { handleConnectRecvTransport } from '@server/handlers/handleConnectRecvTransport';
import { handleConnectTransport } from '@server/handlers/handleConnectTransport';
import { handleConsume } from '@server/handlers/handleConsume';
import { handleCreateRecvTransport } from '@server/handlers/handleCreateRecvTransport';
import { handleCreateTransport } from '@server/handlers/handleCreateTransport';
import { handleGetRouterRtpCapabilities } from '@server/handlers/handleGetRouterRtpCapabilities';
import { handleJoin } from '@server/handlers/handleJoin';
import { handleProduce } from '@server/handlers/handleProduce';
import { Message } from '@server/types/messages';
import type { WebSocket as WsSocket } from 'ws';

export async function handleMessage(ws: WsSocket, data: Message) {
  switch (data.type) {
    case 'join':
      return handleJoin(ws, data.userInfo);
    case 'getRouterRtpCapabilities':
      return handleGetRouterRtpCapabilities(ws);
    case 'createTransport':
      return handleCreateTransport(ws);
    case 'connectTransport':
      return handleConnectTransport(ws, data.dtlsParameters);
    case 'produce':
      return handleProduce(ws, data);
    case 'createRecvTransport':
      return handleCreateRecvTransport(ws);
    case 'connectRecvTransport':
      return handleConnectRecvTransport(ws, data.dtlsParameters);
    case 'consume':
      return handleConsume(ws, data);
  }
}
