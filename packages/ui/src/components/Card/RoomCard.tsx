import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon/Icon';

export type RoomCardProps = React.ComponentProps<'div'> & {
  imageUrl: string;
  genre: string;
  remainingSessions: string[];
  roomName: string;
  isLiked: boolean;
  onLike: () => void;
};

export const RoomCard = ({
  imageUrl,
  genre,
  remainingSessions,
  roomName,
  isLiked,
  onLike,
}: RoomCardProps) => {
  const theme = useTheme();

  return (
    <CardContainer>
      <ImageContainer imageUrl={imageUrl}>
        <LikeButton onClick={onLike}>
          <Icon
            name="heart"
            size={24}
            fill={isLiked ? theme.palette.yellow500 : theme.palette.white}
          />
        </LikeButton>
        <RoomName>
          <Chip colorTheme={'yellow'}>{roomName}</Chip>
        </RoomName>
      </ImageContainer>
      <RoomInfo>
        <div>
          <span className="label">장르: </span>
          <span className="text">{genre}</span>
        </div>
        <div>
          <span className="label">잔여 세션: </span>
          <span className="text">{remainingSessions.join(', ')}</span>
        </div>
      </RoomInfo>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 254px;
`;
const ImageContainer = styled.div<{ imageUrl: string }>`
  position: relative;
  width: 100%;
  height: 154px;
  overflow: hidden;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background-image: url(${({ imageUrl }) => imageUrl});
`;

const LikeButton = styled.button`
  position: absolute;
  top: 24px;
  right: 20px;

  cursor: pointer;
  z-index: 1;
`;

const RoomName = styled.div`
  position: absolute;
  bottom: 12px;
  right: 20px;
  display: flex;
  gap: 12px;
`;

const RoomInfo = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    ${({ theme }) => theme.typo.body2m};
  }

  .label {
    color: ${({ theme }) => theme.palette.yellow800};
  }

  .text {
    color: ${({ theme }) => theme.palette.gray900};
  }
`;
