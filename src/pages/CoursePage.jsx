import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import CourseBanner from '../components/banners/CourseBanner';
import PurchaseBanner from '../components/banners/PurchaseBanner';
import CourseDashBoard from '../components/CourseDashBoard';
import CourseIntroduction from '../components/CourseIntroduction';
import CourseNews from '../components/CourseNews';
import InquiryBoard from '../components/InquiryBoard';
import Container from '../components/ui/Container';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';

const List = styled.ul`
  display: flex;
  
  padding: 1.4rem 3rem;
  border: 1px solid #e1e1e1;

  li{
    margin-inline-end: 2rem;
  }
`;

const Main = styled.div`
  display: grid;

  grid : 1fr / 7fr 3fr;
  gap: 40px;
  padding: 3rem;
`;

export default function CoursePage() {
  const courseStore = useCourseStore();
  const lectureStore = useLectureStore();

  const courseId = window.location.pathname.split('/')[2];
  const category = window.location.pathname.split('/')[3];

  const Components = {
    dashboard: CourseDashBoard,
    inquiries: InquiryBoard,
    news: CourseNews,
  };

  const Component = Components[category] || CourseIntroduction;

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
    lectureStore.fetchLecturesByCourseId({ courseId });
  }, []);

  return (
    <Container>
      <CourseBanner />
      <nav>
        <List>
          {courseStore.course.isPurchased && (
            <li>
              <Link to={`/courses/${courseId}/dashboard`}>
                대시보드
              </Link>
            </li>
          )}
          <li>
            <Link to={`/courses/${courseId}`}>
              강의소개
            </Link>
          </li>
          <li>
            <HashLink to={`/courses/${courseId}#curriculum`}>
              커리큘럼
            </HashLink>
          </li>
          <li>
            <HashLink to={`/courses/${courseId}#reviews`}>
              수강평
            </HashLink>
          </li>
          <li>
            <Link to={`/courses/${courseId}/inquiries`}>
              질문 게시판
            </Link>
          </li>
          <li>
            <Link to={`/courses/${courseId}/news`}>
              새소식
            </Link>
          </li>
          {courseStore.course.isInstructor && (
            <li>
              <Link to={`/courses/${courseId}/edit/course_info`}>
                강의수정
              </Link>
            </li>
          )}
        </List>
      </nav>
      {category !== 'dashboard' ? (
        <Main>
          <Component />
          <PurchaseBanner />
        </Main>
      ) : (
        <Component />
      )}
    </Container>
  );
}
