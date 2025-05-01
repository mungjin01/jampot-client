import { BrowserRouter } from 'react-router-dom';

import { Route, Routes } from 'react-router-dom';
import { MyPage } from '../pages/MyPage';
import { TestPage } from '../pages/TestPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
};
