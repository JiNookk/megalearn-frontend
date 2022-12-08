import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Lecture from '../components/Lecture';
import LectureTab from '../components/LectureTab';
import useLectureStore from '../hooks/useLectureStore';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function LecturePage() {
  const navigate = useNavigate();

  const lectureStore = useLectureStore();

  const courseId = window.location.pathname.split('/')[2];
  const lectureId = window.location.pathname.split('/')[4];

  useEffect(() => {
    lectureStore.fetchLecture({ courseId, lectureId });
  }, []);

  return (
    <Container>
      <Lecture />
      <LectureTab handleNavigate={navigate} />
    </Container>
  );
}
