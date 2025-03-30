import styled from '@emotion/styled';
import { Toggle } from '@repo/ui';

type AccountInfoProps = {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AccountInfo = ({ isPublic, setIsPublic }: AccountInfoProps) => {
  return (
    <div>
      <FormContainer>
        <CalendarContainer>
          <TextContainer>🗓️ 캘린더 권한 허용</TextContainer>
          <Toggle
            checked={false}
            onChange={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </CalendarContainer>
        <GapContainer />
        <CalendarContainer>
          <TextContainer>🌐 공개 허용</TextContainer>
          <Toggle checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
        </CalendarContainer>
        <GapContainer />
        <TextContainer>📞 로그아웃</TextContainer>
        <GapContainer />
        <TextContainer>🍭 회원 탈퇴</TextContainer>
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
  gap: 12px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.white};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;
  width: 100%;
  white-space: nowrap;

  color: ${({ theme }) => theme.palette.gray700};
  ${({ theme }) => theme.typo.label1m};

  cursor: pointer;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  & > div:last-of-type {
    flex-shrink: 0;
  }
`;

const GapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.palette.gray100};
`;
