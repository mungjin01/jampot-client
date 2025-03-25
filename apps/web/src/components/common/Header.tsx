import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Icon } from '@repo/ui';
import { NAVIGATION_MENU } from '@web/constants/navigation';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

interface MenuButtonProps {
  filled?: boolean;
  width?: string;
  children: React.ReactNode;
  onClick: () => void;
}

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  //const navigate = useNavigate();

  return (
    <Headers>
      <Icons>
        <Icon name="jampot" />
      </Icons>

      <Menu>
        {NAVIGATION_MENU.map((item) => (
          <MenuButton
            key={item.menu}
            onClick={() => setLoggedIn((prev) => !prev)}
          >
            {item.menu}
          </MenuButton>
        ))}
        {loggedIn ? (
          <UserButton>
            <Icon name="person" size={18} />
          </UserButton>
        ) : (
          <MenuButton
            filled
            width="100px"
            onClick={() => setLoggedIn((prev) => !prev)}
          >
            로그인
          </MenuButton>
        )}
      </Menu>
    </Headers>
  );
};

const MenuButton = ({ filled, width, children, onClick }: MenuButtonProps) => (
  <MenuButtonStyled filled={filled} width={width} onClick={onClick}>
    {children}
  </MenuButtonStyled>
);

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  padding: 20px 42px;

  border-bottom: 1px solid ${({ theme }) => theme.palette.yellow100};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButtonStyled = styled.button<MenuButtonProps>`
  padding: 8px 24px;
  border-radius: 8px;
  width: ${({ width }) => width || 'auto'};

  ${({ theme }) => theme.typo.body2m};

  ${({ theme, filled }) =>
    filled
      ? css`
          color: ${theme.palette.white};
          background: ${theme.palette.yellow600};

          &:hover {
            background: ${theme.palette.yellow700};
          }
        `
      : css`
          color: ${theme.palette.gray800};
          background: transparent;

          &:hover {
            color: ${theme.palette.yellow600};
          }
        `}
`;

const UserButton = styled.button`
  padding: 10px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.palette.yellow50};
  path {
    fill: ${({ theme }) => theme.palette.yellow500};
  }
`;

const Icons = styled.div`
  display: flex;
  width: 118px;
  height: 36px;
`;
