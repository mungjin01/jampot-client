import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';

import { LoginButton } from '@repo/ui';
import { RisingObjects } from '@web/components/LandingPage/RisingObjects';
import { CameraMovement } from '@web/components/LandingPage/CameraMovement';

export const LandingScene = () => {
  const handleLogin = (provider: 'google' | 'kakao') => {
    const oauthUrl = {
      google: 'https://jampot.co.kr/oauth2/authorization/google',
      kakao: 'https://jampot.co.kr/oauth2/authorization/kakao',
    };

    window.location.href = oauthUrl[provider];
  };
  return (
    <Wrapper>
      <SceneContainer>
        <IntroText>
          실시간 합주를 위한 온라인 공간, <br />
          <span>JamPot</span>을 만나보세요!
        </IntroText>

        <ButtonGroup>
          <LoginButton
            loginTheme="google"
            iconName="google"
            onClick={() => handleLogin('google')}
          >
            Google로 3초만에 시작하기
          </LoginButton>
          <LoginButton
            loginTheme="kakao"
            iconName="kakao"
            iconSize={40}
            onClick={() => handleLogin('kakao')}
          >
            Kakao로 3초만에 시작하기
          </LoginButton>
        </ButtonGroup>
        <Canvas camera={{ position: [0, 20, 20], fov: 75 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ffcc77" />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <RisingObjects count={40} />
          </Suspense>
          <CameraMovement />
        </Canvas>
      </SceneContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;

  background-color: ${({ theme }) => theme.palette.yellow200};
`;

const SceneContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const IntroText = styled.div`
  position: absolute;
  top: 20%;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.gray600};
  z-index: 10;
  pointer-events: none;

  span {
    color: ${({ theme }) => theme.palette.yellow900};
  }
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 10;
  pointer-events: auto;
`;
