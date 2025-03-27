import { BrowserRouter } from 'react-router-dom';
import { TestPage } from '../pages/TestPage';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@web/pages/LoginPage';
import { OnboardingPage } from '@web/pages/OnboardingPage';
import { Mypage } from '@web/pages/Mypage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};
