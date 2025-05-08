import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon/Icon';

export type SessionCardProps = React.ComponentProps<'div'> & {
  imageUrl: string;
  userName: string;
  userDescription: string;
  tags: string[];
  isLiked: boolean;
  onLike: () => void;
};

export const SessionCard = ({
  imageUrl,
  userName,
  userDescription,
  tags,
  isLiked,
  onLike,
}: SessionCardProps) => {
  const theme = useTheme();

  return (
    <CardContainer>
      <ImageContainer>
        <ProfileImage src={imageUrl} alt="profile" />
        <LikeButton onClick={onLike}>
          <Icon
            name="heart"
            size={24}
            fill={isLiked ? theme.palette.yellow500 : theme.palette.white}
          />
        </LikeButton>
        <TagList>
          {tags.map((tag) => (
            <Chip key={tag} colorTheme={'yellow'}>
              {tag}
            </Chip>
          ))}
        </TagList>
      </ImageContainer>
      <UserInfo>
        <UserName>{userName}</UserName>
        <UserDescription>{userDescription}</UserDescription>
      </UserInfo>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 315px;
  border-radius: 16px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.13);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 203px;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 24px;
  right: 20px;

  cursor: pointer;
  z-index: 1;
`;

const TagList = styled.div`
  position: absolute;
  bottom: 12px;
  right: 20px;
  display: flex;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 4px;
`;

const UserName = styled.div`
  ${({ theme }) => theme.typo.body1m};
  color: ${({ theme }) => theme.palette.yellow800};
`;

const UserDescription = styled.div`
  ${({ theme }) => theme.typo.label1r};
  color: ${({ theme }) => theme.palette.gray900};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`;
