import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useNoteStore from '../hooks/useNoteStore';
import NoteUpdateForm from './NoteUpdateForm';
import NoteForm from './NoteForm';
import useVideoStore from '../hooks/useVideoStore';

const List = styled.li`
  list-style: none;
`;

export default function Notes() {
  const { state } = useLocation();
  const { lectureId } = state;
  const noteStore = useNoteStore();
  const videoStore = useVideoStore();

  const handleLectureTime = (lectureTime) => {
    videoStore.play({ lectureTime });
  };

  const handleUpdateNote = (noteId) => {
    noteStore.changeStatus({ noteId });
  };

  const handleDeleteNote = (noteId) => {
    noteStore.deleteNote({ noteId });
  };

  useEffect(() => {
    noteStore.fetchNotes({ lectureId });
  }, []);

  return (
    <article>
      <div>
        <h2>
          노트
        </h2>
        <span>
          내 노트 모두보기
        </span>
      </div>
      {noteStore.notes.length ? (
        <ul>
          {noteStore.notes.map((note) => (
            <List key={note.id}>
              {note.status === 'update' ? (
                <NoteUpdateForm note={note} />
              ) : (
                <div>
                  <p>
                    {note.content}
                  </p>
                  <div>
                    <button type="button" onClick={() => handleLectureTime(note.lectureTime)}>
                      {note.lectureTime.minute}
                      :
                      {note.lectureTime.second}
                    </button>
                    <div>
                      <button type="button" onClick={() => handleUpdateNote(note.id)}>
                        수정
                      </button>
                      <button type="button" onClick={() => handleDeleteNote(note.id)}>
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </List>
          ))}
        </ul>
      ) : (
        <p>
          작성된 노트는 본인에게만 보입니다 :)
          {' '}
          <br />
          수업 내용을 간단히 메모해보세요!
        </p>
      )}
      <NoteForm />
    </article>
  );
}
