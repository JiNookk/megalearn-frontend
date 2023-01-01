import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import useLectureStore from '../../hooks/useLectureStore';
import useSectionStore from '../../hooks/useSectionStore';
import CourseSubmitModal from '../modals/CourseSubmitModal';
import Button from '../ui/Button';

const Tab = styled.aside`
  padding-block-start: 1rem;
  margin-inline-end: 2rem;
`;

const Heading = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;

  margin-block-end: 2rem;
`;

const List = styled.ul`
  li{
    margin-block-end: 1rem;
  }
`;

const SubmitButton = styled(Button)`
  padding: 1rem 1rem;
  
  color: #FFF;
  background: #fb6351;
`;

export default function CreateCourseTab() {
  const courseId = window.location.pathname.split('/')[2];

  const [isModal, setIsModal] = useState(false);
  const courseStore = useCourseStore();
  const sectionStore = useSectionStore();
  const lectureStore = useLectureStore();

  const handleSubmit = () => {
    setIsModal(true);
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
    sectionStore.fetchSections({ courseId });
    lectureStore.fetchLectures({ courseId });
  }, []);

  return (
    <Tab>
      <Heading>강의제작</Heading>
      <List>
        <li>
          <Link to={`/courses/${courseId}/edit/course_info`}>
            {courseStore.course.title && courseStore.course.category
              ? '✅ '
              : '❎ '}
            강의정보
          </Link>
        </li>
        <li>
          <Link to={`/courses/${courseId}/edit/description`}>
            {courseStore.course.description
              ? '✅ '
              : '❎ '}
            상세소개
          </Link>
        </li>
        <li>
          <Link to={`/courses/${courseId}/edit/curriculum`}>
            {lectureStore.lectures?.length > 1 && sectionStore.sections?.length > 1
              ? '✅ '
              : '❎ '}
            커리큘럼
          </Link>
        </li>
        <li>
          <Link to={`/courses/${courseId}/edit/cover_image`}>
            {courseStore.course.coverImage
              ? '✅ '
              : '❎ '}
            커버 이미지
          </Link>
        </li>
      </List>
      <Heading>설정</Heading>
      <List>
        <li>
          <Link to={`/courses/${courseId}/edit/course_setting`}>
            {courseStore.course.price === 0 || courseStore.course.price
              ? '✅ '
              : '❎ '}
            강의설정
          </Link>
        </li>
        {/* <li>
          <Link to="/courses/:courseId/edit/description">
            상세소개
          </Link>
        </li>
        <li>
          <Link to="/courses/:courseId/edit/curriculum">
            커리큘럼
          </Link>
        </li>
        <li>
          <Link to="/courses/:courseId/edit/cover_image">
            커버이미지
          </Link>
        </li> */}
      </List>
      <SubmitButton type="button" onClick={handleSubmit}>제출하기</SubmitButton>
      {isModal && (
        <CourseSubmitModal courseId={courseId} onIsModal={setIsModal} />
      )}
    </Tab>
  );
}
