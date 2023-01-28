/* eslint-disable react/no-array-index-key */
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link/dist/react-router-hash-link.cjs.production';
import { useEffect } from 'react';
import SubTitle from '../components/ui/SubTitle';
import Container from '../components/ui/Container';
import Title from '../components/ui/Title';
import InlineBlock from '../components/ui/InlineBlock';
import useNoteStore from '../hooks/useNoteStore';
import useLectureStore from '../hooks/useLectureStore';
import useSectionStore from '../hooks/useSectionStore';
import useCourseStore from '../hooks/useCourseStore';
import { videoStore } from '../stores/VideoStore';
import getQueryParam from '../utils/getQueryParam';
import Padding from '../components/ui/Padding';

const NoteHeader = styled.div`
  padding-block: 2rem;
  border-bottom: 1px solid #e8ecef;

  h2, p{
    text-align: center;
  }
`;

const Main = styled(InlineBlock)`
  padding-block : 2rem;  
`;

const Notes = styled.ul`
  margin-inline-end: 5rem;
`;

const Section = styled.h3`
  color: #bbc2c8;
`;

const Lecture = styled(SubTitle)`
  margin-block-end: 1rem;
`;

const Button = styled.button`
  font-size: 1rem;
  margin-block: 1rem;
  border: none;
  background: none;
  color: #bbc2c8;
  text-align: start;

  img{
    width: 17px;
    height: 17px;
  }
`;

const ButtonsWrapper = styled.div`
  text-align: end;
`;

const Content = styled.p`
  padding-inline: 1rem;
  padding-block: 1rem 2rem;
  margin-bottom: 2.5rem;
  background: #f8f9fa;
`;

const Navigator = styled.ul`
  padding-left: 1rem;
  border-inline-start: 2px solid #bbc2c8;
  
  * {
    color: #bbc2c8;
  }

  li{
    margin-top: 1rem;
  }
`;

export default function NotePage() {
  const courseId = getQueryParam({ category: 'courseId' });

  const navigate = useNavigate();

  const lectureStore = useLectureStore();
  const sectionStore = useSectionStore();
  const noteStore = useNoteStore();
  const courseStore = useCourseStore();

  const handleNavigate = (lectureId, lectureTime) => {
    navigate(`/courses/${courseId}/lectures/${lectureId}?tab=notes`);

    videoStore.setLectureTime({ lectureTime });
  };

  const handleDeleteNote = (noteId) => {
    noteStore.deleteNote({ noteId });
  };

  useEffect(() => {
    lectureStore.fetchMyLectures();
    sectionStore.fetchSections();
    noteStore.fetchMyNotes();
    courseStore.fetchMyCourses();
  }, []);

  return (
    <Container>
      <NoteHeader>
        <Padding>
          <Link to="/account/my-notes">
            강의 노트 리스트 보기
          </Link>
          <Title>
            {courseStore.courses
              .find((course) => course.id === +courseId)
              ?.title}
          </Title>
          <p>
            오진욱
          </p>
        </Padding>
      </NoteHeader>
      <hr />
      <Padding>
        <Main>
          <Notes>
            {lectureStore.lectures
              .filter((lecture) => lecture.courseId === +courseId)
              .map((lecture) => (
                <li key={lecture.id}>
                  {sectionStore.sections
                    .filter((section) => lecture.sectionId === section.id)
                    .map((section) => (
                      <Section key={section.id} id={section.id}>
                        {section.title}
                      </Section>
                    ))}
                  <Lecture>
                    {lecture.title}
                  </Lecture>
                  <ul>
                    {noteStore.notes
                      .filter((note) => note.lectureId === lecture.id)
                      .map((note) => (
                        <li key={note.id}>
                          <InlineBlock>
                            <Button onClick={() => handleNavigate(lecture.id, note.lectureTime)}>
                              <img src="/assets/images/start.png" alt="play" />
                              {' '}
                              {note.lectureTime.minute}
                              :
                              {note.lectureTime.second}
                            </Button>
                            <ButtonsWrapper>
                              <Button onClick={() => handleNavigate(lecture.id, note.lectureTime)}>
                                수정
                              </Button>
                              <Button type="button" onClick={() => handleDeleteNote(note.id)}>
                                삭제
                              </Button>
                            </ButtonsWrapper>
                          </InlineBlock>
                          <Content>
                            {note.content}
                          </Content>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </Notes>
          <div>
            <Navigator>
              {sectionStore.sections
                .filter((section) => (
                  lectureStore.lectures
                    .filter((lecture) => lecture.courseId === +courseId)
                    .map((lecture) => lecture.sectionId)
                    .reduce((acc, currentId) => acc || currentId === section.id, false)
                ))
                .map((section) => (
                  <li key={section.id}>
                    <HashLink to={`?courseId=${courseId}#${section.id}`}>
                      {section.title}
                    </HashLink>
                  </li>
                ))}
            </Navigator>
          </div>
        </Main>
      </Padding>
    </Container>
  );
}
