import { useEffect } from 'react';
import styled from 'styled-components';
import useSectionFormStore from '../../hooks/useSectionFormStore';
import useSectionStore from '../../hooks/useSectionStore';
import SubTitle from '../ui/SubTitle';

const Form = styled.form`
  /* width: 300px;
  height: 200px; */
  
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

  input{
    width: 100%;
    padding: 1rem;
    margin-block-end: .5rem;
    border:none;
    background: #F7F7F7;
  }

  >div:last-child{
    justify-content: end;
  }
`;

export default function SectionModal({ onIsModal, courseId }) {
  const sectionFormStore = useSectionFormStore();
  const sectionStore = useSectionStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const section = ['title', 'goal']
      .reduce((acc, key) => ({
        ...acc,
        [key]: sectionFormStore[key],
      }), {});

    sectionFormStore.reset();

    onIsModal(false);

    if (sectionStore.modifyingSection.id) {
      sectionStore.update({
        sectionId: sectionStore.modifyingSection.id,
        ...section,
      });

      sectionStore.completeModify();
      return;
    }

    sectionStore.save({ courseId, ...section });
  };

  const handleCancel = () => {
    sectionStore.completeModify();
    onIsModal(false);
  };

  useEffect(() => {
    sectionFormStore.changeTitle(sectionStore.modifyingSection.title);
    sectionFormStore.changeGoal(sectionStore.modifyingSection.goal);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <SubTitle>
        {sectionStore.modifyingSection.id ? '섹션 수정' : '섹션 추가'}
      </SubTitle>
      <div>
        <label hidden htmlFor="input-title">제목</label>
        <input
          type="text"
          id="input-title"
          placeholder="제목을 입력해주세요."
          value={sectionFormStore.title}
          onChange={(e) => sectionFormStore.changeTitle(e.target.value)}
        />
      </div>
      <div>
        <label hidden htmlFor="input-goal">학습 목표</label>
        <input
          type="text"
          id="input-goal"
          placeholder="학습 목표를 입력해주세요."
          value={sectionFormStore.goal}
          onChange={(e) => sectionFormStore.changeGoal(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleCancel}>취소</button>
        <button type="submit">저장</button>
      </div>
    </Form>
  );
}
