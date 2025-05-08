import { ChatCard, RoomCard, SessionCard, Tab } from '@repo/ui';
import { startWebRTC } from '@web/webrtc';
import { useRef, useState } from 'react';

export const TestPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [participants, setParticipants] = useState<{
    [id: string]: MediaStream;
  }>({});
  const [peerList, setPeerList] = useState<
    { id: string; name: string; role: string }[]
  >([]);

  const myInfoRef = useRef<{
    id: string;
    name: string;
    role: string;
  } | null>(null);
  const audioContextRef = useRef(new AudioContext());
  const gainNodesRef = useRef<Record<string, GainNode>>({});

  const handleStartWebRTC = async () => {
    if (!myInfoRef.current) {
      const name = prompt('이름 입력') || '익명';
      const role = prompt('역할 입력') || '악기 없음';
      myInfoRef.current = {
        id: crypto.randomUUID(),
        name,
        role,
      };
    }

    await audioContextRef.current.resume();

    const myStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = audioContextRef.current;
    const mySource = audioContext.createMediaStreamSource(myStream);
    const myGain = audioContext.createGain();
    mySource.connect(myGain);
    myGain.connect(audioContext.destination);
    gainNodesRef.current[myInfoRef.current.id] = myGain;
    setParticipants((prev) => ({ ...prev, [myInfoRef.current!.id]: myStream }));

    startWebRTC({
      userInfo: myInfoRef.current,
      onConnect: () => setIsConnected(true),
      onLog: (message) => setLog((prev) => [...prev, message]),
      onTrack: (userId, stream) => {
        const audioContext = audioContextRef.current;
        const source = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNodesRef.current[userId] = gainNode;

        setParticipants((prev) => ({ ...prev, [userId]: stream }));
      },
      onPeerList: setPeerList,
    });

    setStarted(true);
  };

  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'liked'>('search');

  return (
    <div style={{ padding: '20px' }}>
      <h2>합주 테스트 페이지</h2>
      <p>연결 상태: {isConnected ? '연결됨' : '연결 안 됨'}</p>
      <button onClick={handleStartWebRTC} disabled={started}>
        연결 시작
      </button>

      <ChatCard
        targetprofileImgUrl="https://i.esdrop.com/d/f/AfOYjCl4ON/sZfPFcWjDG.jpg"
        targetnickname="닉네임"
        lastMessage="마지막 채팅 내용 들어가는 자리 마지막 채팅 내용 들어가는 자리 마지막 채팅 내용 들어가는 자리 마지막 채팅 내용 들어가는 자리"
        lastMessageTime="2025.05.06"
        unreadCount={3}
        onClick={() => {
          console.log('클릭티비');
        }}
      />

      <SessionCard
        imageUrl="https://i.esdrop.com/d/f/AfOYjCl4ON/sZfPFcWjDG.jpg"
        userName="유지예"
        userDescription="자기 소개 들어가는 자리 자기 소개 들어가는 자리 자기 소개 들어가는 자리 자기 소개 들어가는 자리 자기 소개 들어가는 자리 자기 소개 들어가는 자리 "
        tags={['Vocal', 'Guitar']}
        isLiked={liked}
        onLike={() => setLiked(!liked)}
      />

      <RoomCard
        imageUrl="https://i.esdrop.com/d/f/AfOYjCl4ON/XN5oxZTwMD.png"
        genre="락"
        remainingSessions={['보컬', '기타']}
        roomName="합주실이름티비"
        isLiked={liked}
        onLike={() => setLiked(!liked)}
      />
      <Tab<'search' | 'liked'>
        items={[
          { label: '세션 검색', value: 'search' },
          { label: '세션 찜 리스트 보기', value: 'liked' },
        ]}
        selected={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'search' && <div>세션 검색</div>}
      {activeTab === 'liked' && <div>세션 찜 리스트 보기</div>}

      <h3>참가자 목록</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
        }}
      >
        {peerList.map((peer) => {
          const gainNode = gainNodesRef.current[peer.id];
          return (
            <div
              key={peer.id}
              style={{
                border: '1px solid black',
                padding: '10px',
                background:
                  peer.id === myInfoRef.current?.id ? '#fff9d6' : 'white',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>
                {peer.name} ({peer.role})
              </div>

              {gainNode && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  defaultValue={1}
                  onChange={(e) => {
                    gainNode.gain.value = parseFloat(e.target.value);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
