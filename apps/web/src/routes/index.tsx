import { BrowserRouter } from 'react-router-dom';
import { TestPage } from '../pages/TestPage';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@web/pages/LoginPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
