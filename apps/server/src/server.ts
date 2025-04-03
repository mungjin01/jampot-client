import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import * as mediasoup from 'mediasoup';
import { mediasoupConfig } from './mediasoupConfig';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let worker: mediasoup.types.Worker;
let router: mediasoup.types.Router;

const transports = new Map<WebSocket, mediasoup.types.WebRtcTransport>();
const producers = new Map<WebSocket, mediasoup.types.Producer>();
const consumers = new Map<WebSocket, mediasoup.types.Consumer>();

async function initMediasoup() {
  worker = await mediasoup.createWorker({
    rtcMinPort: mediasoupConfig.worker.rtcMinPort,
    rtcMaxPort: mediasoupConfig.worker.rtcMaxPort,
  });

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

async function createWebRtcTransport() {
  const transport = await router.createWebRtcTransport(
    mediasoupConfig.webRtcTransport
  );

  console.log(`WebRTC Transport 생성됨: ${transport.id}`);

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
}

initMediasoup();

wss.on('connection', (ws) => {
  console.log('WebSocket 연결됨');
  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === 'getRouterRtpCapabilities') {
      ws.send(
        JSON.stringify({
          type: 'routerRtpCapabilities',
          data: router.rtpCapabilities,
        })
      );
    } else if (data.type === 'createTransport') {
      const { transport, params } = await createWebRtcTransport();
      transports.set(ws, transport);

      ws.send(JSON.stringify({ type: 'transportCreated', data: params }));
    } else if (data.type === 'connectTransport') {
      const transport = transports.get(ws);
      if (!transport) return;
      await transport.connect({ dtlsParameters: data.dtlsParameters });
      console.log('Send Transport 연결 완료');
    } else if (data.type === 'produce') {
      const transport = transports.get(ws);
      if (!transport) return;

      const producer = await transport.produce({
        kind: data.kind,
        rtpParameters: data.rtpParameters,
      });

      producers.set(ws, producer);

      ws.send(JSON.stringify({ type: 'produced', id: producer.id }));
      console.log('Producer 생성됨:', producer.id);
    } else if (data.type === 'createRecvTransport') {
      const { transport, params } = await createWebRtcTransport();
      transports.set(ws, transport);

      ws.send(JSON.stringify({ type: 'recvTransportCreated', data: params }));
    } else if (data.type === 'connectRecvTransport') {
      const transport = transports.get(ws);
      if (!transport) return;

      await transport.connect({ dtlsParameters: data.dtlsParameters });
      console.log('Recv Transport 연결 완료');
    } else if (data.type === 'consume') {
      const recvTransport = transports.get(ws);
      const producer = [...producers.values()][0];

      if (!recvTransport || !producer) return;

      const consumer = await recvTransport.consume({
        producerId: producer.id,
        rtpCapabilities: data.rtpCapabilities,
        paused: false,
      });

      consumers.set(ws, consumer);

      ws.send(
        JSON.stringify({
          type: 'consumed',
          data: {
            id: consumer.id,
            producerId: producer.id,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
          },
        })
      );

      console.log('Consumer 생성됨:', consumer.id);
    }
  });

  ws.on('close', () => {
    transports.delete(ws);
    producers.delete(ws);
    consumers.delete(ws);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
