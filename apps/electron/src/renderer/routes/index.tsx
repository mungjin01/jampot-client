import { BrowserRouter } from 'react-router-dom';

import { Route, Routes } from 'react-router-dom';
import { MyPage } from '../pages/MyPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};
