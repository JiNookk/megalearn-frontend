import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import Button from '../ui/Button';
import SubTitle from '../ui/SubTitle';

const Form = styled.form`
  width: 310px;
  
  z-index: 999;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;

  >div{
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block: 1rem;
  }

  p{
    margin-block: .5rem;
    text-align: start;
  }

  >div:last-child{
    justify-content: end;
  }

  button{
    border: 1px solid #dadada;
    margin-inline: .2rem
  }
`;

export default function CourseSubmitModal({ onIsModal, courseId }) {
  const navigate = useNavigate();
  const courseStore = useCourseStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    courseStore.submitCourse({ courseId, status: 'submit' });

    onIsModal(false);

    navigate('/instructor');
  };

  const handleCancel = () => {
    onIsModal(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SubTitle>강의 제출 준비</SubTitle>
      <p>
        모든 항목을 작성해주셨나요?
      </p>
      <p>
        강의가격, 커리큘럼, 소개 등을 한번 더 확인해 주세요.
      </p>
      <p>모든 확인이 끝나면 강의를 오픈합니다.</p>
      <Button type="button" onClick={handleCancel}>취소</Button>
      <Button
        disabled={courseStore.isFetchingProcessing}
        type="submit"
      >
        확인
      </Button>
    </Form>
  );
}
