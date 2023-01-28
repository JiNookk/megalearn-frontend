import React from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import useNoteFormStore from '../hooks/useNoteFormStore';
import useInquiryPostFormStore from '../hooks/useInquiryPostFormStore';
import useCommentFormStore from '../hooks/useCommentFormStore';

const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 120px;
  background-color: white;
`;

export default function TextEditor({ type, height, placeholder }) {
  const noteFormStore = useNoteFormStore();
  const inquiryFormStore = useInquiryPostFormStore();
  const commentFormStore = useCommentFormStore();

  const { quill, quillRef } = useQuill({ placeholder });

  const handlers = {
    note: noteFormStore,
    inquiry: inquiryFormStore,
    comment: commentFormStore,
  };

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        handlers[type].changeContent(quill.getText());
      });
    }
  }, [quill]);

  return (
    <EditorContainer>
      <div style={{ width: '100%', height }}>
        <div ref={quillRef} />
      </div>
    </EditorContainer>
  );
}
