import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import LecturePage from './pages/LecturePage';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';
import MyCoursesPage from './pages/MyCoursesPage';
import darkTheme from './styles/darkTheme';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  const [themeName] = useLocalStorage('theme', 'default');
  const [, setAccessToken] = useLocalStorage('accessToken');

  useEffect(() => {
    // setAccessToken('');
  }, []);

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/:courseId/unit/:lectureId" element={<LecturePage />} />
        <Route path="/account/dashboard" element={<MyAccountPage />} />
        <Route path="/account/my-courses" element={<MyCoursesPage />} />
      </Routes>
    </ThemeProvider>
  );
}
