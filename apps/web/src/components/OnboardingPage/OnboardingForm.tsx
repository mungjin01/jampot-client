import { Button, Dropdown, TextField } from '@repo/ui';
import { useState } from 'react';
import styled from '@emotion/styled';
import { fetcher } from '@repo/api';
import {
  GENRES,
  PUBLIC_OPTIONS,
  SESSION_LABEL_TO_VALUE,
  SESSION_LABELS,
  SESSION_VALUE_TO_LABEL,
} from '@web/constants/onboarding';

export const OnboardingForm = () => {
  const [nickname, setNickname] = useState('');
  const [selectedSessions, setSessions] = useState<string[]>([]);
  const [selectedGenres, setGenres] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

  const handlePublicSelect = (value: string[]) => {
    if (value.includes('공개')) {
      setIsPublic(true);
    } else if (value.includes('비공개')) {
      setIsPublic(false);
    } else {
      setIsPublic(null);
    }
  };

  const isFormValid = () => {
    return (
      !!nickname &&
      selectedSessions.length > 0 &&
      selectedGenres.length > 0 &&
      isPublic !== null
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert('모든 정보를 입력해주세요!');
      return;
    }

    const requestBody = {
      nickname,
      sessionList: selectedSessions,
      genreList: selectedGenres,
      isPublic,
    };

    fetcher
      .post('/user/join', requestBody)
      .then((res) => {
        console.log('회원가입 성공:', res);
        window.location.href = '/home';
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
          title="세션 선택"
          contents={SESSION_LABELS}
          selectedContents={selectedSessions.map(
            (v) => SESSION_VALUE_TO_LABEL[v]
          )}
          setSelectedContents={(labels) =>
            setSessions(labels.map((l) => SESSION_LABEL_TO_VALUE[l]))
          }
          width="434px"
        />
      </OnboardingSection>
      <OnboardingSection>
        장르 정하기
        <Dropdown
          title="장르 선택"
          contents={GENRES}
          selectedContents={selectedGenres}
          setSelectedContents={setGenres}
          width="434px"
        />
      </OnboardingSection>
      <OnboardingSection>
        공개 비공개 여부
        <Dropdown
          title="공개 여부 선택"
          contents={PUBLIC_OPTIONS}
          selectedContents={
            isPublic === true ? ['공개'] : isPublic === false ? ['비공개'] : []
          }
          setSelectedContents={handlePublicSelect}
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
  border-radius: 20px;
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
