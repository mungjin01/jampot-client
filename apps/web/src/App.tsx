import { UIProvider } from '@repo/ui';
import { Router } from './routes';
import './index.css';

import { QueryClientProvider } from '@repo/api';

const App = () => {
  return (
    <QueryClientProvider>
      <UIProvider>
        <Router />
      </UIProvider>
    </QueryClientProvider>
  );
};

export default App;
