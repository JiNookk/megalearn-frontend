import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import CreateCoursePage from './pages/CreateCoursePage';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import InstructorPage from './pages/InstructorPage';
import LecturePage from './pages/LecturePage';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';
import darkTheme from './styles/darkTheme';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';
import UploadCourseInfo from './components/UploadCourseInfo';
import UploadDescription from './components/UploadDescription';
import UploadCurriCulum from './components/UploadCurriCulum';
import UploadCoverImage from './components/UploadCoverImage';
import CourseSetting from './components/CourseSetting';
import CourseTitlePage from './pages/CourseTitlePage';
import InstructorDashBoard from './components/InstructorDashBoard';
import Questions from './components/Questions';
import UploadedCourses from './components/UploadedCourses';
import RatingList from './components/RatingList';
import Profits from './components/Profits';
import CoursesPage from './pages/CoursesPage';
import CartPage from './pages/CartPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import NotePage from './pages/NotePage';
import InquiryPage from './pages/InquiryPage';
import OrderPage from './pages/OrderPage';
import RegisterPage from './pages/RegisterPage';
import useCategoryStore from './hooks/useCategoryStore';
import CommunityPage from './pages/CommunityPage';

export default function App() {
  const [themeName] = useLocalStorage('theme', 'default');
  // const [, setAccessToken] = useLocalStorage('accessToken');

  const categoryStore = useCategoryStore();

  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/dashboard" element={<MyAccountPage />} />
        <Route path="/account/my-courses" element={<MyAccountPage />} />
        <Route path="/account/my-notes" element={<MyAccountPage />} />
        <Route path="/account/my-posts" element={<MyAccountPage />} />
        <Route path="/account/likes" element={<MyAccountPage />} />
        <Route path="/carts" element={<CartPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {categoryStore.categories
          .map((category) => (
            <Route
              key={category.id}
              path={`/courses${category.url ? `/${category.url}` : ''}`}
              element={<CoursesPage />}
            />
          ))}
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/:courseId/inquiries" element={<CoursePage />} />
        <Route path="/courses/:courseId/news" element={<CoursePage />} />
        <Route path="/courses/:courseId/dashboard" element={<CoursePage />} />
        <Route path="/courses/:courseId/lectures/:lectureId" element={<LecturePage />} />
        <Route path="/courses/:courseId/edit/course_info" element={<CreateCoursePage Component={UploadCourseInfo} />} />
        <Route path="/courses/:courseId/edit/description" element={<CreateCoursePage Component={UploadDescription} />} />
        <Route path="/courses/:courseId/edit/curriculum" element={<CreateCoursePage Component={UploadCurriCulum} />} />
        <Route path="/courses/:courseId/edit/cover_image" element={<CreateCoursePage Component={UploadCoverImage} />} />
        <Route path="/courses/:courseId/edit/course_setting" element={<CreateCoursePage Component={CourseSetting} />} />
        <Route path="/create_course" element={<CourseTitlePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/inquiries/:inquiryId" element={<InquiryPage />} />
        <Route path="/instructor" element={<InstructorPage Component={InstructorDashBoard} />} />
        <Route path="/instructor/courses" element={<InstructorPage Component={UploadedCourses} />} />
        <Route path="/instructor/questions" element={<InstructorPage Component={Questions} />} />
        <Route path="/instructor/ratings" element={<InstructorPage Component={RatingList} />} />
        <Route path="/instructor/profits" element={<InstructorPage Component={Profits} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mynote" element={<NotePage />} />
        <Route path="/my-orders" element={<OrderPage />} />
        <Route path="/purchaseSuccess" element={<PurchaseSuccessPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </ThemeProvider>
  );
}
