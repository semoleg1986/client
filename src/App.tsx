import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/HomePage';
import NotFoundPage from './pages/404/NotFoundPage';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default App;
