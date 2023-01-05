/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';

import CurriCulum from './CurriCulum';
import Reviews from './Reviews';
import Container from './ui/Container';

const Introduction = styled(Container)`
  h2{
    font-size: 2rem;
  }

  h3{
    font-size: 1.5rem;
  }
`;

const Description = styled.div`
  margin-block-end: 4rem;
`;

const Goals = styled.div`
  display: flex;

  margin-block: 1rem;
  padding: 3rem 2rem;
  border: 1px solid #e8ecef;

  h3{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 3rem;
  }

  li{
    margin: 1rem;
  }
`;

export default function CourseIntroduction() {
  const courseId = window.location.pathname.split('/')[2];

  const courseStore = useCourseStore();

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
  }, []);

  return (
    <Introduction>
      <Description>
        <h2>
          <strong>
            {courseStore.course.level}
            자
          </strong>
          를 위해 준비한
          {' '}
          <br />
          <strong>
            [
            {courseStore.course.category}
            ] 강의 입니다.
          </strong>
        </h2>
        <Goals>
          <h3>
            ✍️
            <br />
            이런걸
            <br />
            배워요!
          </h3>
          <ul>
            {courseStore.course.goals
              ?.map((goal, i) => (
                <li key={i}>
                  ✅
                  {' '}
                  {goal}
                </li>
              ))}
          </ul>
        </Goals>
        <p>
          {courseStore.course.description}
        </p>
      </Description>
      <CurriCulum />
      <Reviews />
    </Introduction>
  );
}
