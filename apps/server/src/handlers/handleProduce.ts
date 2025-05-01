import type { WebSocket as WsSocket } from 'ws';
import type {
  MediaKind,
  RtpParameters,
  Producer,
} from 'mediasoup/node/lib/types';
import { transportManager } from '@server/managers/TransportManager';
import { peerManager } from '@server/managers/PeerManager';

const producers = new Map<string, Producer>();

export async function handleProduce(
  ws: WsSocket,
  data: { userId: string; kind: MediaKind; rtpParameters: RtpParameters }
) {
  const transport = transportManager.get(data.userId);
  if (!transport) return;

  const producer = await transport.produce({
    kind: data.kind,
    rtpParameters: data.rtpParameters,
  });

  producers.set(data.userId, producer);

  ws.send(JSON.stringify({ type: 'produced', id: producer.id }));

  for (const [peerId, peer] of peerManager['peers'].entries()) {
    if (peerId === data.userId) continue;
    peer.ws.send(JSON.stringify({ type: 'newProducer', userId: data.userId }));
  }
}
