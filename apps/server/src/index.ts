import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { initMediasoup } from '@server/mediasoup';
import { setupWebSocket } from '@server/ws';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

(async () => {
  await initMediasoup();
  setupWebSocket(server);
})();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
