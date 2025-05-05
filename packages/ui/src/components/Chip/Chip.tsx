import styled from '@emotion/styled';

type Props = React.ComponentProps<'div'> & ChipProps;
type ColorTheme = 'yellow' | 'blue';

export interface ChipProps {
  colorTheme: ColorTheme;
  width?: string;
  children: React.ReactNode;
}

export const Chip = ({ children, colorTheme, width, ...rest }: Props) => {
  return (
    <Styled.Container colorTheme={colorTheme} width={width} {...rest}>
      {children}
    </Styled.Container>
  );
};

const Container = styled.div<ChipProps>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  width: ${({ width }) => width || 'auto'};
  height: 38px;
  padding: 0 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.13);

  ${({ theme }) => theme.typo.body1m};

  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'yellow':
        return `
            color: ${theme.palette.yellow700};
            background-color: ${theme.palette.yellow50};
            `;
      case 'blue':
        return `
            color: ${theme.palette.blue700};
            background-color: ${theme.palette.blue50};
            `;
    }
  }}
`;

const Styled = { Container };
