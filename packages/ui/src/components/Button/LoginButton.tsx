import React from 'react';
import styled from '@emotion/styled';
import { Icon } from '../Icon/Icon';

type Props = React.ComponentProps<'button'> & ButtonProps;
type LoginTheme = 'google' | 'kakao';

export interface ButtonProps {
  loginTheme: LoginTheme;
  iconName?: 'google' | 'kakao';
  iconSize?: number;
}

export const LoginButton = ({
  children,
  loginTheme,
  iconName,
  iconSize,
  ...rest
}: Props) => {
  return (
    <Styled.Container loginTheme={loginTheme} {...rest}>
      {iconName && (
        <Styled.Icons>
          <Icon name={iconName} size={iconSize ?? 18} />
        </Styled.Icons>
      )}
      {children}
    </Styled.Container>
  );
};

const Container = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: 1px solid;
  width: 274px;
  height: 56px;

  ${({ theme }) => theme.typo.body2m};

  ${({ loginTheme, theme }) => {
    switch (loginTheme) {
      case 'google':
        return `
          background-color:  ${theme.palette.white};
          color: #191600;
          border-color: #dfdfdf;
        `;
      case 'kakao':
        return `
          background-color:#fee500;
          color: #191600;
          border-color: #fee500;
        `;
    }
  }}

  &:hover {
    filter: brightness(80%);
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  padding: 1px;

  margin-right: 24px;
`;

const Styled = { Container, Icons };

export default LoginButton;
