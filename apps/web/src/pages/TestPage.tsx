import { startWebRTC } from '@web/webrtc';
import { useEffect, useRef, useState } from 'react';

export const TestPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const logHandler = (message: string) => {
      setLog((prev) => [...prev, message]);
    };

    startWebRTC({
      onConnect: () => setIsConnected(true),
      onLog: logHandler,
    });

    return () => {
      setIsConnected(false);
    };
  }, []);

  const handleCheckMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
    } catch (error) {
      setLog((prev) => [...prev, '카메라 또는 마이크 접근 불가']);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>WebRTC 테스트 페이지</h2>
      <p>연결 상태: {isConnected ? '연결됨' : '연결 안 됨'}</p>
      <button onClick={handleCheckMedia}>비디오 & 마이크 테스트</button>
      <h3>로그</h3>
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '10px',
        }}
      >
        {log.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '300px', marginTop: '10px', border: '1px solid black' }}
      />
    </div>
  );
};
