/* eslint-disable no-mixed-operators */
import styled from 'styled-components';
import useInquiryPostFormStore from '../../hooks/useInquiryPostFormStore';

const Container = styled.div`
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

export default function ErrorModal({ onIsModal }) {
  const inquiryPostFormStore = useInquiryPostFormStore();

  const blankProperty = !inquiryPostFormStore.title && '제목'
  || !inquiryPostFormStore.content && '내용';

  const handleModalOff = () => {
    onIsModal(false);
  };

  return (
    <Container>
      <h2>입력 값 확인</h2>
      <p>
        {blankProperty}
        을 필수로 작성해주세요
      </p>
      <button type="button" onClick={handleModalOff}>확인</button>
    </Container>
  );
}
