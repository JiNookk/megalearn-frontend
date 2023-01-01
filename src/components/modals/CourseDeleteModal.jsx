import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';

const Modal = styled.div`
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

export default function CourseDeleteModal({ onIsModal, courseId }) {
  const courseStore = useCourseStore();

  const handleCancelModal = () => {
    onIsModal(false);
  };

  const handleDeleteCourse = () => {
    courseStore.delete({ courseId });

    onIsModal(false);
  };

  return (
    <Modal>
      <h2>강의를 삭제하시겠습니까?</h2>
      <p>삭제한 강의는 복구되지 않습니다.</p>
      <button type="button" onClick={handleCancelModal}>취소</button>
      <button type="button" onClick={handleDeleteCourse}>확인</button>
    </Modal>
  );
}
