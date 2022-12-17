import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import LecturePage from './pages/LecturePage';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';
import MyCoursesPage from './pages/MyCoursesPage';

export default function App() {
  const [, setAccessToken] = useLocalStorage('accessToken');

  useEffect(() => {
    // setAccessToken('');
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/:courseId/unit/:lectureId" element={<LecturePage />} />
        <Route path="/account/dashboard" element={<MyAccountPage />} />
        <Route path="/account/my-courses" element={<MyCoursesPage />} />
      </Routes>
    </div>
  );
}
