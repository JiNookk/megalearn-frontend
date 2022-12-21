import { useLocation } from 'react-router-dom';
import useNoteFormStore from '../hooks/useNoteFormStore';
import useNoteStore from '../hooks/useNoteStore';
import useVideoStore from '../hooks/useVideoStore';

export default function NoteForm() {
  const { state } = useLocation();
  const { lectureId } = state;

  const videoStore = useVideoStore();
  const noteFormStore = useNoteFormStore();
  const noteStore = useNoteStore();

  const handleSubmitNote = (event) => {
    event.preventDefault();

    const { content } = noteFormStore;

    noteStore.save({ lectureId, content, lectureTime: videoStore.currentTime() });

    noteFormStore.reset();
  };

  return (
    <div>
      <form>
        <label hidden htmlFor="input-note">
          노트
        </label>
        <textarea
          id="input-note"
          rows="10"
          cols="30"
          placeholder="마크다운, 단축키를 이용해서 편리하게 글을 작성할 수 있어요."
          value={noteFormStore.content}
          onChange={(e) => noteFormStore.changeContent(e.target.value)}
        />

        <div>
          <button type="submit" onClick={handleSubmitNote}>노트 입력</button>
        </div>
      </form>
    </div>
  );
}
