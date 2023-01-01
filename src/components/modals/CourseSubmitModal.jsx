import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import Button from '../ui/Button';

const Form = styled.form`
  width: 300px;
  height: 200px;
  
  z-index: 999;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border: 1px solid black;
  border-radius: 8px;

  text-align: center;
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
      <h2>강의 제출 준비</h2>
      <p>
        모든 항목을 작성해주셨나요?
        <br />
        강의가격, 커리큘럼, 소개 등을 한번 더 확인해 주세요.
      </p>
      <p>
        강의 준비에 미흡한 사항이 있을 경우,
        담당MD의 안내와 함께 강의 상태가
        미제출(임시저장 상태)로 변경될 수 있습니다.
      </p>
      <p>모든 확인이 끝나면 강의를 오픈합니다.</p>
      <button type="button" onClick={handleCancel}>취소</button>
      <Button
        disabled={courseStore.isFetchingProcessing}
        type="submit"
      >
        확인
      </Button>
    </Form>
  );
}
