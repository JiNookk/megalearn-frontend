import { useEffect } from 'react';
import styled from 'styled-components';
import useSectionFormStore from '../../hooks/useSectionFormStore';
import useSectionStore from '../../hooks/useSectionStore';

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
      <h2>{sectionStore.modifyingSection.id ? '섹션 수정' : '섹션 추가'}</h2>
      <div>
        <label htmlFor="input-title">제목</label>
        <input
          type="text"
          id="input-title"
          value={sectionFormStore.title}
          onChange={(e) => sectionFormStore.changeTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-goal">학습 목표</label>
        <input
          type="text"
          id="input-goal"
          value={sectionFormStore.goal}
          onChange={(e) => sectionFormStore.changeGoal(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleCancel}>취소</button>
      <button type="submit">저장</button>
    </Form>
  );
}
