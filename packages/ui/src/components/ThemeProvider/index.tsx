/** @jsxImportSource @emotion/react */
import { ThemeProvider as BaseThemeProvider, Global } from '@emotion/react';
import palette from '../../styles/palette';
import typo from '../../styles/typo';
import { GlobalStyle } from '../../styles/GlobalStyles';

const theme = {
  palette,
  typo,
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <BaseThemeProvider theme={theme}>
    <Global styles={GlobalStyle} />
    {children}
  </BaseThemeProvider>
);

export default ThemeProvider;
