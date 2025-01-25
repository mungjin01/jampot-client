import styled from '@emotion/styled';

type Props = React.ComponentProps<'button'> & ButtonProps;
type ColorTheme = 'gray' | 'black' | 'blue1' | 'blue2' | 'yellow1' | 'yellow2';

export interface ButtonProps {
  colorTheme: ColorTheme;
  width?: string;
  height?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  colorTheme,
  width,
  height,
  ...rest
}: Props) => {
  return (
    <Styled.Container
      colorTheme={colorTheme}
      width={width}
      height={height}
      {...rest}
    >
      {children}
    </Styled.Container>
  );
};

const Container = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 24px;
  border-radius: 8px;

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};

  ${({ theme }) => theme.typo.label1m};

  &:disabled {
    cursor: unset;
  }

  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'gray':
        return `
          color: ${theme.palette.gray700};
          background-color: ${theme.palette.gray200};
        `;
      case 'black':
        return `
          color: ${theme.palette.white};
          background-color: ${theme.palette.gray800};
           &:hover {
            background-color: ${theme.palette.gray700};
          }
        `;
      case 'blue1':
        return `
          color: ${theme.palette.blue50};
          background-color: ${theme.palette.blue600};
          &:hover {
            background-color: ${theme.palette.blue700};
          }
        `;
      case 'blue2':
        return `
          color: ${theme.palette.blue700};
          background-color: ${theme.palette.blue50};
          &:hover {
            background-color: ${theme.palette.blue100};
          }
        `;
      case 'yellow1':
        return `
          color: ${theme.palette.yellow50};
          background-color: ${theme.palette.yellow600};
          &:hover {
            background-color: ${theme.palette.yellow700};
        `;
      case 'yellow2':
        return `
          color: ${theme.palette.yellow700};
          background-color: ${theme.palette.yellow50};
          &:hover {
            background-color: ${theme.palette.yellow100};
        `;
      default:
        return '';
    }
  }}
`;

const Styled = { Container };
