import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';
import usePaymentStore from '../hooks/usePaymentStore';
import useProgressStore from '../hooks/useProgressStore';
import percentageFormat from '../utils/percentageFormat';
import SubTitle from './ui/SubTitle';

const Image = styled.img`
  width: 100%;
  height: 10em;
`;

const Courses = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 100px;

  width: 100%;
`;

export default function MyCourses() {
  const paymentStore = usePaymentStore();
  const courseStore = useCourseStore();
  const progressStore = useProgressStore();
  const lectureStore = useLectureStore();

  useEffect(() => {
    courseStore.fetchMyCourses();
    lectureStore.fetchLectures();
    progressStore.fetchProgresses();
  }, []);

  return (
    <Courses>
      {courseStore.courses
        ?.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <Image src={course.coverImage || '/assets/images/test.jpg'} alt="course-thumbnail" />
              <SubTitle>{course.title}</SubTitle>
              <p>
                진행률:
                {percentageFormat(progressStore.progresses
                  .filter((progress) => progress.courseId === course.id)
                  .filter((progress) => progress.status === 'completed')
                  .length
              / lectureStore.lectures
                .filter((lecture) => lecture.courseId === course.id)
                .length || 0)}
                %
              </p>
            </Link>
          </li>
        ))}
    </Courses>
  );
}
