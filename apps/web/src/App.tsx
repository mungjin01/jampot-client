import { UIProvider } from '@repo/ui';
import { Router } from './routes';
import './index.css';

const App = () => {
  return (
    <UIProvider>
      <Router />
    </UIProvider>
  );
};

export default App;
