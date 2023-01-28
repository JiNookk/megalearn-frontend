import styled from 'styled-components';
import useNoteFormStore from '../../hooks/useNoteFormStore';
import useNoteStore from '../../hooks/useNoteStore';
import useVideoStore from '../../hooks/useVideoStore';
import TextEditor from '../../utils/TextEditor';

const Form = styled.form`
  text-align: end;
  background: white;

  button{
    padding: .8rem 1rem;
    border-radius: .25rem;
    background: #495057;
    color: white;
  }
`;

export default function NoteForm() {
  const lectureId = window.location.pathname.split('/')[4];

  const videoStore = useVideoStore();
  const noteFormStore = useNoteFormStore();
  const noteStore = useNoteStore();

  const handleSubmitNote = (event) => {
    event.preventDefault();

    const { content } = noteFormStore;

    if (!content) {
      return;
    }

    noteStore.save({ lectureId, content, lectureTime: videoStore.currentTime() });

    noteFormStore.reset();
  };

  return (
    <Form onSubmit={handleSubmitNote}>
      <TextEditor
        type="note"
        height={200}
      />
      <div>
        <button type="submit">노트 입력</button>
      </div>
    </Form>
  );
}
