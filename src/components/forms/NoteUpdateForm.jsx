import useNoteStore from '../../hooks/useNoteStore';
import useNoteUpdateFormStore from '../../hooks/useNoteUpdateFormStore';

export default function NoteUpdateForm({ note }) {
  const noteUpdateFormStore = useNoteUpdateFormStore();
  const noteStore = useNoteStore();

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const { content } = noteUpdateFormStore;

    noteStore.updateNote({ content, noteId: note.id });

    noteStore.cancelUpdate();

    noteUpdateFormStore.reset();
  };

  const handleCancelUpdate = () => {
    noteStore.cancelUpdate();
  };

  return (
    <form onSubmit={handleSubmitUpdate}>
      <label hidden htmlFor="input-note">
        내용 수정
      </label>
      <textarea
        id="input-note"
        rows="10"
        cols="30"
        placeholder="마크다운, 단축키를 이용해서 편리하게 글을 작성할 수 있어요."
        value={noteUpdateFormStore.content}
        onChange={(e) => noteUpdateFormStore.changeContent(e.target.value)}
      />
      <div>
        <button type="button" onClick={handleCancelUpdate}>취소</button>
      </div>
      <div>
        <button type="submit">업데이트</button>
      </div>
    </form>
  );
}
