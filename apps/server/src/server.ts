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

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === 'produce') {
      console.log('클라이언트가 오디오 송출을 시작함');
      console.log(`Kind: ${data.kind}`);
      console.log(`RTP Parameters:`, data.rtpParameters);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket 연결 종료');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
