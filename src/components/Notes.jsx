import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useNoteStore from '../hooks/useNoteStore';
import NoteUpdateForm from './NoteUpdateForm';
import NoteForm from './NoteForm';
import useVideoStore from '../hooks/useVideoStore';
import { TabHeading } from './ui/Tab';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.article`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const List = styled.ul`
  li{
    list-style: none;
    border-top: 1px solid black;
  
    padding:1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2rem;
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
    <Container>
      <TabHeading>
        <h2>
          노트
        </h2>
        {' '}
        <span>
          | 내 노트 모두보기
        </span>
      </TabHeading>
      {noteStore.notes.length ? (
        <List>
          {noteStore.notes.map((note) => (
            <li key={note.id}>
              {note.status === 'update' ? (
                <NoteUpdateForm note={note} />
              ) : (
                <div>
                  <p>
                    {note.content}
                  </p>
                  <ButtonContainer>
                    <PrimaryButton type="button" onClick={() => handleLectureTime(note.lectureTime)}>
                      {note.lectureTime.minute}
                      :
                      {note.lectureTime.second}
                    </PrimaryButton>
                    <div>
                      <PrimaryButton type="button" onClick={() => handleUpdateNote(note.id)}>
                        수정
                      </PrimaryButton>
                      <PrimaryButton type="button" onClick={() => handleDeleteNote(note.id)}>
                        삭제
                      </PrimaryButton>
                    </div>
                  </ButtonContainer>
                </div>
              )}
            </li>
          ))}
        </List>
      ) : (
        <p>
          작성된 노트는 본인에게만 보입니다 :)
          {' '}
          <br />
          수업 내용을 간단히 메모해보세요!
        </p>
      )}
      <NoteForm />
    </Container>
  );
}
