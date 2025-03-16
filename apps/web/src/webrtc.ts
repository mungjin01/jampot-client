import { Device } from 'mediasoup-client';

interface WebRTCOptions {
  onConnect: () => void;
  onLog: (message: string) => void;
}

export const startWebRTC = ({ onConnect, onLog }: WebRTCOptions) => {
  const socket = new WebSocket('ws://localhost:4000');
  let device: Device;
  let sendTransport: any; //TODO

  socket.onopen = () => {
    onLog('WebSocket 연결됨');
    socket.send(JSON.stringify({ type: 'getRouterRtpCapabilities' }));
  };

  socket.onmessage = async (event) => {
    const message = JSON.parse(event.data);
    onLog(`메시지 수신: ${message.type}`);

    if (message.type === 'routerRtpCapabilities') {
      device = new Device();
      await device.load({ routerRtpCapabilities: message.data });

      onLog('Router RTP Capabilities 로드 완료');
      socket.send(JSON.stringify({ type: 'createTransport' }));
    }

    if (message.type === 'transportCreated') {
      const transportParams = message.data;

      sendTransport = device.createSendTransport(transportParams);
      onLog('Send Transport 생성 완료');

      sendTransport.on('connect', ({ dtlsParameters }, callback) => {
        socket.send(
          JSON.stringify({ type: 'connectTransport', dtlsParameters })
        );
        onLog('Transport 연결 요청');
        callback();
      });

      sendTransport.on('produce', async ({ kind, rtpParameters }, callback) => {
        socket.send(JSON.stringify({ type: 'produce', kind, rtpParameters }));
        onLog('오디오 송출 시작');
        callback({ id: 'fake-producer-id' });
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const track = stream.getAudioTracks()[0];

      await sendTransport.produce({ track });
      onConnect();
    }
  };
};
