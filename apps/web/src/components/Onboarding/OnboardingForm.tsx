import { Button, Dropdown, TextField } from '@repo/ui';
import { useState } from 'react';
import styled from '@emotion/styled';
import { fetcher } from '@repo/api';

export const OnboardingForm = () => {
  const [nickname, setNickname] = useState('');
  const [selectedSessions, setSessions] = useState<string[]>([]);
  const [selectedGenres, setGenres] = useState<string[]>([]);
  const [selectedPublic, setPublic] = useState<string[]>([]);

  const sessions = ['보컬', '기타', '베이스', '키보드', '드럼', '그 외']; //TODO: constant로 분리
  const genres = ['락', '팝', '재즈', '힙합', '클래식', '그 외'];
  const publicOptions = ['공개', '비공개'];

  const isFormValid = () => {
    return (
      !!nickname &&
      selectedSessions.length > 0 &&
      selectedGenres.length > 0 &&
      selectedPublic.length > 0
    );
  };

  const handleSubmit = () => {
    const requestBody = {
      nickname,
      sessionList: selectedSessions,
      genreList: selectedGenres,
      isPublic: selectedPublic.includes('공개'),
    };

    if (!isFormValid()) {
      alert('모든 정보를 입력해주세요!');
      return;
    }

    fetcher
      .post('/user/join', requestBody)
      .then((res) => {
        console.log('회원가입 성공:', res);
      })
      .catch((err) => {
        console.error('회원가입 실패:', err);
      });
  };

  return (
    <OnboardingContainer>
      <OnboardingSection>
        닉네임 입력하기(*)
        <TextField
          width="434px"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </OnboardingSection>
      <OnboardingSection>
        세션 정하기
        <Dropdown
          title={'세션 선택'}
          contents={sessions}
          selectedContents={selectedSessions}
          setSelectedContents={setSessions}
          width="434px"
        />
      </OnboardingSection>
      <OnboardingSection>
        장르 정하기
        <Dropdown
          title={'장르 선택'}
          contents={genres}
          selectedContents={selectedGenres}
          setSelectedContents={setGenres}
          width="434px"
        />
      </OnboardingSection>
      <OnboardingSection>
        공개 비공개 여부
        <Dropdown
          title={'공개 여부 선택'}
          contents={publicOptions}
          selectedContents={selectedPublic}
          setSelectedContents={setPublic}
          width="434px"
        />
      </OnboardingSection>
      <SubmitButtonContainer>
        <Button colorTheme="gray" width="209px" height="48px">
          취소하기
        </Button>
        <Button
          colorTheme="yellow1"
          width="209px"
          height="48px"
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </SubmitButtonContainer>
    </OnboardingContainer>
  );
};

const OnboardingContainer = styled.div`
  display: flex;
  padding: 60px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.palette.white};
`;

const OnboardingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({ theme }) => theme.typo.body2m};
  color: ${({ theme }) => theme.palette.gray700};
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;
