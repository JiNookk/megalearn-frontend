/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import CourseDescriptionEditor from '../utils/CourseDescriptionEditor';
import PrimaryButton from './ui/PrimaryButton';
import Title from './ui/Title';

const Form = styled.form`
  background: white;
  padding: 2.5rem 1.25rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;

  >p{
    margin-block: 1rem;
    color: #ABB0B5;
  }
`;

const Guide = styled.div`
  padding: 1rem;
  background: #F7F7F7;
  margin-block: 2.5rem;
  
  h3{
    margin-bottom: .5rem;
  }

  div{
    margin-block: 1.5rem;
  }

  p{
    margin-block: .5rem
  }
`;

const ButtonWrapper = styled.div`
  margin-block: 2rem;
  text-align: center;

  button{
    padding: 1rem .5rem;
  }
`;

export default function UploadDescription() {
  const navigate = useNavigate();

  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const course = ['description'].reduce((acc, key) => ({
      ...acc,
      [key]: courseFormStore[key],
    }), {});

    if (course.description) {
      courseStore.update({ ...courseStore.course, ...course, courseId });

      navigate(`/courses/${courseId}/edit/curriculum`, {
        state: { courseId },
      });
    }
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
  }, []);

  useEffect(() => {
    courseFormStore.changeDescription(courseStore.course.description);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        강의제작
      </p>
      <Title>
        상세소개
      </Title>
      <Guide>
        <div>
          <h3>
            <strong>
              매력적인 소개글
            </strong>
          </h3>
          <p>
            강의 소개글은 수강신청 및 강의 판매에 결정적인 영향을 미칩니다.
          </p>
          <p>
            정성껏 소개글을 작성해주세요!
          </p>
        </div>
        <div>
          <h3>
            <strong>
              소개글을 꼼꼼히 작성해 주세요
            </strong>
          </h3>
          <p>
            수강생을 설득할 수 있도록 내 강의의 매력을 마음껏 드러내보세요!
          </p>
          <p>
            만약, 글이 모자라거나 꼭 들어가야 할 내용을 빠뜨리면
          </p>
          <p>
            강의 오픈이 지연되거나 반려될 수 있어요.
            (Enter: 문단 나눔, Shift+Enter: 줄바꿈)
          </p>
        </div>
      </Guide>
      <p>
        강의 상세내용
      </p>
      <CourseDescriptionEditor />
      <ButtonWrapper>
        <PrimaryButton type="submit">저장 후 다음이동</PrimaryButton>
      </ButtonWrapper>
    </Form>
  );
}
