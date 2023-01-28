import React from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import useCourseFormStore from '../hooks/useCourseFormStore';

const EditorContainer = styled.div`
  margin-bottom: 120px;
`;

export default function CourseDescriptionEditor() {
  const courseFormStore = useCourseFormStore();

  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        courseFormStore.changeDescription(quill.getText());
      });
    }
  }, [quill]);

  return (
    <EditorContainer>
      <div style={{ width: '100%', height: 500 }}>
        <div ref={quillRef} />
      </div>
    </EditorContainer>
  );
}
