import { useEffect } from 'react';
import styled from 'styled-components';
import useNoteStore from '../hooks/useNoteStore';
import useVideoStore from '../hooks/useVideoStore';
import PrimaryButton from './ui/PrimaryButton';
import NoteUpdateForm from './forms/NoteUpdateForm';
import NoteForm from './forms/NoteForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  overflow-y: scroll;

  button{
    border: none;
    color: #8f979e;
  }
`;

const Heading = styled.div`
  padding: 1.5rem;
  font-size: 1.4rem;
  border-bottom: 1px solid #f1f3f5;

  span{
    color: #ced4da;
  }
`;

const NoteList = styled.article`
  flex: 1;
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
    border-top: 1px solid #e8ecef;
    border-collapse: collapse;
    padding:1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NoteFormWrapper = styled.div`
  position: sticky;
  bottom: 0%;
  padding: 1.5rem;
  background: white;
  -webkit-box-shadow: 5px 5px 15px 5px #989c9f; 
  box-shadow: 5px 5px 15px 5px #989c9f;
`;

const Notice = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Notes() {
  const lectureId = window.location.pathname.split('/')[4];

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
    noteStore.fetchNotesByLectureId({ lectureId });
  }, []);

  return (
    <Container>
      <NoteList>
        <Heading>
          <h2>
            노트
          </h2>
          {' '}
          <span>
            | 내 노트 모두보기
          </span>
        </Heading>
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
                          📝수정
                        </PrimaryButton>
                        <PrimaryButton type="button" onClick={() => handleDeleteNote(note.id)}>
                          🗑삭제
                        </PrimaryButton>
                      </div>
                    </ButtonContainer>
                  </div>
                )}
              </li>
            ))}
          </List>
        ) : (
          <Notice>
            <p>
              작성된 노트는 본인에게만 보입니다 :)
              {' '}
              <br />
              수업 내용을 간단히 메모해보세요!
            </p>
          </Notice>
        )}
      </NoteList>
      <NoteFormWrapper>
        <NoteForm />
      </NoteFormWrapper>
    </Container>
  );
}
