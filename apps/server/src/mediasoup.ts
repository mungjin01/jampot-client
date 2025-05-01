import { mediasoupConfig } from '@server/config/mediasoupConfig';
import * as mediasoup from 'mediasoup';

export let router: mediasoup.types.Router;

export async function initMediasoup() {
  const worker = await mediasoup.createWorker(mediasoupConfig.worker);

  router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
    ],
  });

  console.log('Mediasoup Worker & Router 초기화 완료');
}
