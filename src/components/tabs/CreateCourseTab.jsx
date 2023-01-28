import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import useLectureStore from '../../hooks/useLectureStore';
import useSectionStore from '../../hooks/useSectionStore';
import CourseSubmitModal from '../modals/CourseSubmitModal';
import Button from '../ui/Button';

const Tab = styled.aside`
  display: block;
  width: 140px;
  margin-inline-end: 4rem;
`;

const Heading = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-block-end: 1.5rem;
`;

const List = styled.ul`
  margin-block-end: 3rem;

  li{
    margin-block-end: 1rem;

    a{
      display: flex;
      align-items: center;

      p{
        margin-inline-end: .5rem
      }
    }
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding-block: 1rem;
  color: #FFF;
  background: #EE806D;
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
    sectionStore.fetchSectionsByCourseId({ courseId });
    lectureStore.fetchLecturesByCourseId({ courseId });
  }, []);

  return (
    <Tab>
      <Heading>강의제작</Heading>
      <List>
        <li>
          <Link to={`/courses/${courseId}/edit/course_info`}>
            <p>
              {courseStore.course.title && courseStore.course.category
                ? (
                  <img src="/assets/images/qualified.png" alt="qualified" />
                )
                : (
                  <img src="/assets/images/unqualified.png" alt="unqualified" />
                )}
            </p>
            <p>
              강의정보
            </p>
          </Link>
        </li>
        <li>
          <Link to={`/courses/${courseId}/edit/description`}>
            <p>
              {courseStore.course.description
                ? (
                  <img src="/assets/images/qualified.png" alt="qualified" />
                )
                : (
                  <img src="/assets/images/unqualified.png" alt="unqualified" />
                )}
            </p>
            <p>
              상세소개
            </p>
          </Link>
        </li>
        <li>
          <Link to={`/courses/${courseId}/edit/curriculum`}>
            <p>
              {lectureStore.lectures?.length > 1 && sectionStore.sections?.length > 1
                ? (
                  <img src="/assets/images/qualified.png" alt="qualified" />
                )
                : (
                  <img src="/assets/images/unqualified.png" alt="unqualified" />
                )}
            </p>
            <p>
              커리큘럼
            </p>
          </Link>
        </li>
        <li>
          <Link to={`/courses/${courseId}/edit/cover_image`}>
            <p>
              {courseStore.course.coverImage
                ? (
                  <img src="/assets/images/qualified.png" alt="qualified" />
                )
                : (
                  <img src="/assets/images/unqualified.png" alt="unqualified" />
                )}
            </p>
            <p>
              커버 이미지
            </p>
          </Link>
        </li>
      </List>
      <Heading>설정</Heading>
      <List>
        <li>
          <Link to={`/courses/${courseId}/edit/course_setting`}>
            <p>
              {courseStore.course.price === 0 || courseStore.course.price
                ? (
                  <img src="/assets/images/qualified.png" alt="qualified" />
                )
                : (
                  <img src="/assets/images/unqualified.png" alt="unqualified" />
                )}
            </p>
            <p>
              강의설정
            </p>
          </Link>
        </li>
      </List>
      <SubmitButton
        disabled={courseStore.isDisabled || lectureStore.isDisabled || sectionStore.isDisabled}
        type="button"
        onClick={handleSubmit}
      >
        제출하기
      </SubmitButton>
      {isModal && (
        <CourseSubmitModal courseId={courseId} onIsModal={setIsModal} />
      )}
    </Tab>
  );
}
