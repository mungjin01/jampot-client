import styled from '@emotion/styled';
import { Button, Icon } from '@repo/ui';

type NicknameFormProps = {
  nickName: string;
  selfIntroduction: string;
  profileImgUrl: string;
};

export const NicknameForm = ({
  nickName,
  selfIntroduction,
  profileImgUrl,
}: NicknameFormProps) => {
  return (
    <div>
      <FormContainer>
        {profileImgUrl ? (
          <ProfileImage src={profileImgUrl} alt="프로필 이미지" />
        ) : (
          <Icon name="profileImage" size={100} />
        )}
        <NicknameInput
          type="text"
          placeholder="닉네임"
          defaultValue={nickName}
        />
        <IntroduceInput
          placeholder="자기소개입력하기"
          defaultValue={selfIntroduction}
        />
        <Button colorTheme="yellow2" height="48px">
          저장하기
        </Button>
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
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.white};
`;
const NicknameInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 10px;

  color: ${({ theme }) => theme.palette.gray700};
  ${({ theme }) => theme.typo.body1m};

  text-align: center;
`;

const IntroduceInput = styled.textarea`
  width: 100%;
  margin-top: 6px;
  margin-bottom: 28px;
  padding: 10px;

  color: ${({ theme }) => theme.palette.gray700};
  ${({ theme }) => theme.typo.label1r};

  border: 1px solid ${({ theme }) => theme.palette.yellow200};
  border-radius: 8px;

  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;
