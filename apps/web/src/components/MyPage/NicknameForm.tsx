import styled from '@emotion/styled';
import { Icon } from '@repo/ui';
import { fetcher } from '@repo/api';

type NicknameFormProps = {
  nickName: string;
  setNickName: (val: string) => void;
  selfIntroduction: string;
  setSelfIntroduction: (val: string) => void;
  profileImgUrl: string;
  setProfileImgUrl: (val: string) => void;
};

export const NicknameForm = ({
  nickName,
  setNickName,
  selfIntroduction,
  setSelfIntroduction,
  profileImgUrl,
  setProfileImgUrl,
}: NicknameFormProps) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetcher.post<{ profileImageUrl: string }>(
        '/user/upload-profile-img',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfileImgUrl(res.profileImageUrl);
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <FormContainer>
        <ImageUploadWrapper>
          <label htmlFor="profile-image-upload">
            {profileImgUrl ? (
              <ProfileImage src={profileImgUrl} alt="프로필 이미지" />
            ) : (
              <Icon name="profileImage" size={100} />
            )}
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </ImageUploadWrapper>

        <NicknameInput
          type="text"
          placeholder="닉네임"
          defaultValue={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <IntroduceInput
          placeholder="자기소개입력하기"
          defaultValue={selfIntroduction}
          onChange={(e) => setSelfIntroduction(e.target.value)}
        />
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
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.13);
  background-color: ${({ theme }) => theme.palette.white};
  justify-content: center;
  align-items: center;
`;

const ImageUploadWrapper = styled.div`
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
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
