import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { UIProvider } from '@repo/ui';

createRoot(document.getElementById('root')!).render(
  <UIProvider>
    <App />
  </UIProvider>
);
