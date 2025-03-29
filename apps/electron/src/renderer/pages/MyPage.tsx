import { AccountInfo } from '../components/MyPage/AccountInfo';
import { NicknameForm } from '../components/MyPage/NicknameForm';
import { ProfileInfo } from '../components/MyPage/ProfileInfo';
import styled from '@emotion/styled';

export const MyPage = () => {
  return (
    <MyPageContainer>
      <LeftContainer>
        <NicknameForm />
        <AccountInfo />
      </LeftContainer>
      <ProfileInfo />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  height: 100vh;

  padding: 32px;
  gap: 32px;

  justify-content: center;
  align-items: flex-start;

  background-color: ${({ theme }) => theme.palette.yellow50};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 32px;
`;
