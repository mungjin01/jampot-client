import styled from '@emotion/styled';
import { Button, ButtonTextField, Dropdown } from '@repo/ui';
import {
  GENRES,
  SESSION_LABEL_TO_VALUE,
  SESSION_LABELS,
} from '@web/constants/onboarding';

type ProfileInfoProps = {
  sessionList: string[];
  setSessionList: (sessions: string[]) => void;
  genreList: string[];
  setGenreList: (genres: string[]) => void;
  audioFileUrl: string;
  setAudioFileUrl: (url: string) => void;
  onSave: () => void;
};

export const ProfileInfo = ({
  sessionList,
  setSessionList,
  genreList,
  setGenreList,
  audioFileUrl,
  setAudioFileUrl,
  onSave,
}: ProfileInfoProps) => {
  return (
    <div>
      <FormContainer>
        <SectionContainer>
          세션 정하기
          <Dropdown
            title="세션 선택"
            width="434px"
            contents={SESSION_LABELS}
            selectedContents={sessionList.map((v) => SESSION_LABEL_TO_VALUE[v])}
            setSelectedContents={(labels) =>
              setSessionList(labels.map((l) => SESSION_LABEL_TO_VALUE[l]))
            }
          />
        </SectionContainer>
        <SectionContainer>
          장르 정하기
          <Dropdown
            title="장르 선택"
            contents={GENRES}
            selectedContents={genreList}
            setSelectedContents={setGenreList}
            width="434px"
          />
        </SectionContainer>
        <SectionContainer>
          15초 오디오
          <ButtonTextField
            width="434px"
            buttonText={'올리기'}
            buttonClickHandler={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </SectionContainer>
        <ButtonContainer>
          <Button colorTheme="yellow2" height="48px" onClick={onSave}>
            저장하기
          </Button>
        </ButtonContainer>
      </FormContainer>
    </div>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 40px;
  border-radius: 16px;
  gap: 32px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.white};
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({ theme }) => theme.typo.body2m};
  color: ${({ theme }) => theme.palette.gray700};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 179px;
`;
