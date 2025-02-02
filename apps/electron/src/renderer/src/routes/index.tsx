import { BrowserRouter } from 'react-router-dom';
import { TestPage } from '../pages/TestPage';
import { Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
};
