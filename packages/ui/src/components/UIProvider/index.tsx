import ThemeProvider from '../ThemeProvider';

interface UIProviderProps {
  children: React.ReactNode;
}

const UIProvider = ({ children }: UIProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default UIProvider;
