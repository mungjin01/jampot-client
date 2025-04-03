import { useEffect, useState } from 'react';
import { AccountInfo } from '../components/MyPage/AccountInfo';
import { NicknameForm } from '../components/MyPage/NicknameForm';
import { ProfileInfo } from '../components/MyPage/ProfileInfo';
import styled from '@emotion/styled';
import { fetcher } from '@repo/api';

type MypageResponse = {
  nickName: string;
  selfIntroduction: string;
  profileImgUrl: string;
  audioFileUrl: string;
  isPublic: boolean;
  sessionList: string[];
  genreList: string[];
  calendarServiceAgreement: boolean;
};

export const MyPage = () => {
  const [nickName, setNickName] = useState('');
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [calenderServiceAgreement, setCalenderServiceAgreement] =
    useState(false);
  const [sessionList, setSessionList] = useState<string[]>([]);
  const [genreList, setGenreList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcher.get<MypageResponse>('/user/mypage');
        setNickName(res.nickName);
        setSelfIntroduction(res.selfIntroduction);
        setProfileImgUrl(res.profileImgUrl);
        setAudioFileUrl(res.audioFileUrl);
        setIsPublic(res.isPublic);
        setSessionList(res.sessionList);
        setGenreList(res.genreList);
      } catch (error) {
        console.error('마이페이지 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await fetcher.put('/user/mypage/edit', {
        nickName,
        selfIntroduction,
        profileImageUrl: profileImgUrl,
        profileAudioUrl: audioFileUrl,
        sessionList,
        genreList,
        isPublic,
        calenderServiceAgreement,
      });
      alert('저장 완료!');
    } catch (error) {
      alert('저장 실패');
    }
  };

  return (
    <MyPageContainer>
      <LeftContainer>
        <NicknameForm
          nickName={nickName}
          setNickName={setNickName}
          selfIntroduction={selfIntroduction}
          setSelfIntroduction={setSelfIntroduction}
          profileImgUrl={profileImgUrl}
          setProfileImgUrl={setProfileImgUrl}
        />
        <AccountInfo
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          calenderServiceAgreement={calenderServiceAgreement}
          setCalenderServiceAgreement={setCalenderServiceAgreement}
        />
      </LeftContainer>
      <ProfileInfo
        sessionList={sessionList}
        setSessionList={setSessionList}
        genreList={genreList}
        setGenreList={setGenreList}
        audioFileUrl={audioFileUrl}
        setAudioFileUrl={setAudioFileUrl}
        onSave={handleSave}
      />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 42px;
  gap: 32px;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.yellow50};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
