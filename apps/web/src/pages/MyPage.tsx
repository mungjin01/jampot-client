import styled from '@emotion/styled';
import { fetcher } from '@repo/api';

import { AccountInfo } from '@web/components/MyPage/AccountInfo';
import { NicknameForm } from '@web/components/MyPage/NicknameForm';
import { ProfileInfo } from '@web/components/MyPage/ProfileInfo';
import { useEffect, useState } from 'react';

type MypageResponse = {
  nickName: string;
  selfIntroduction: string;
  profileImgUrl: string;
  audioFileUrl: string;
  isPublic: boolean;
  sessionList: string[];
  genreList: string[];
};

export const MyPage = () => {
  const [data, setData] = useState<MypageResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcher.get<MypageResponse>('/user/mypage');
        setData(res);
      } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>불러오는 중입니다...</div>;

  return (
    <MyPageContainer>
      <LeftContainer>
        <NicknameForm
          nickName={data.nickName}
          selfIntroduction={data.selfIntroduction}
          profileImgUrl={data.profileImgUrl}
        />
        <AccountInfo isPublic={data.isPublic} />
      </LeftContainer>
      <ProfileInfo
        sessionList={data.sessionList}
        genreList={data.genreList}
        audioFileUrl={data.audioFileUrl}
      />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  height: 100vh;

  padding: 22px;
  gap: 32px;

  justify-content: center;
  align-items: flex-start;

  background-color: ${({ theme }) => theme.palette.yellow50};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;
