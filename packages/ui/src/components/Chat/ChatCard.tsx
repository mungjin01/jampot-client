import styled from '@emotion/styled';

export type ChatCardProps = React.ComponentProps<'div'> & {
  targetprofileImgUrl: string;
  targetnickname: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  onClick: () => void;
};

export const ChatCard = ({
  targetprofileImgUrl,
  targetnickname,
  lastMessage,
  lastMessageTime,
  unreadCount,

  onClick,
}: ChatCardProps) => {
  return (
    <CardContainer onClick={onClick}>
      <ImageContainer>
        <ProfileImage targetprofileImgUrl={targetprofileImgUrl} />
      </ImageContainer>
      <UserInfo>
        <TopLine>
          <UserName>{targetnickname}</UserName>
          {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
        </TopLine>
        <LastMessage>{lastMessage}</LastMessage>
        <LastMessageTime>{lastMessageTime}</LastMessageTime>
      </UserInfo>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  width: 300px;
  align-items: center;

  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
`;
const ProfileImage = styled.div<{ targetprofileImgUrl: string }>`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  background-image: url(${({ targetprofileImgUrl }) => targetprofileImgUrl});
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserName = styled.div`
  ${({ theme }) => theme.typo.body2m};
  color: ${({ theme }) => theme.palette.gray900};
`;
const UnreadCount = styled.div`
  ${({ theme }) => theme.typo.body2m};
  color: ${({ theme }) => theme.palette.yellow700};
`;
const LastMessage = styled.div`
  ${({ theme }) => theme.typo.label1r};
  color: ${({ theme }) => theme.palette.gray900};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`;
const LastMessageTime = styled.div`
  ${({ theme }) => theme.typo.label2};
  color: ${({ theme }) => theme.palette.gray500};
`;
