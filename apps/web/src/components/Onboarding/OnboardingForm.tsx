import { Button, ButtonTextField, Dropdown } from '@repo/ui';
import { useState } from 'react';
import styled from '@emotion/styled';

export const OnboardingForm = () => {
  const [selectedSessions, setSessions] = useState<string[]>([]);
  const sessions = ['보컬', '기타', '베이스', '키보드', '드럼', '그 외'];
  const [selectedGenres, setGenres] = useState<string[]>([]);
  const genres = ['락', '팝', '재즈', '힙합', '클래식', '그 외'];
  const [selectedPublic, setPublic] = useState<string[]>([]);
  const publicOptions = ['공개', '비공개'];

  function handleClick(): void {
    console.log('click');
  }

  return (
    <OnboardingContainer>
      <OnboardingSection>
        닉네임 입력하기(*)
        <ButtonTextField
          width="434px"
          buttonText="제출하기"
          buttonClickHandler={handleClick}
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
          title={'category'}
          contents={genres}
          selectedContents={selectedGenres}
          setSelectedContents={setGenres}
          width="434px"
        />
      </OnboardingSection>
      <OnboardingSection>
        공개 비공개 여부
        <Dropdown
          title={'세션 선택'}
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
        <Button colorTheme="yellow1" width="209px" height="48px">
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
