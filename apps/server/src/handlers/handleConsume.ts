import type { WebSocket as WsSocket } from 'ws';
import type { RtpCapabilities } from 'mediasoup/node/lib/types';

import { transportManager } from '@server/managers/TransportManager';
import { producerManager } from '@server/managers/ProducerManager';

export async function handleConsume(
  ws: WsSocket,
  data: { userId: string; rtpCapabilities: RtpCapabilities }
) {
  const recvTransport = transportManager.get(data.userId);
  if (!recvTransport) return;

  for (const [otherUserId, producer] of producerManager.getAll()) {
    if (otherUserId === data.userId) continue;

    const consumer = await recvTransport.consume({
      producerId: producer.id,
      rtpCapabilities: data.rtpCapabilities,
      paused: false,
    });
    console.log(
      `[consume] created consumer for ${data.userId} from ${otherUserId}`
    );

    ws.send(
      JSON.stringify({
        type: 'consumed',
        data: {
          id: consumer.id,
          producerId: producer.id,
          userId: otherUserId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        },
      })
    );
  }
}
