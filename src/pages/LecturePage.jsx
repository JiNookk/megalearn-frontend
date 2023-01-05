import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Lecture from '../components/Lecture';
import LectureTab from '../components/tabs/LectureTab';
import Container from '../components/ui/Container';
import useLectureStore from '../hooks/useLectureStore';
import useProgressStore from '../hooks/useProgressStore';

const LectureContainer = styled(Container)`
    flex-direction: row;
    justify-content: space-between;
`;

export default function LecturePage() {
  const navigate = useNavigate();

  const progressStore = useProgressStore();
  const lectureStore = useLectureStore();

  const courseId = window.location.pathname.split('/')[2];
  const lectureId = window.location.pathname.split('/')[4];

  useEffect(() => {
    progressStore.fetchProgresses({ courseId });

    lectureStore.fetchLecture({ courseId, lectureId });

    lectureStore.fetchLectures({ courseId });
  }, [lectureId]);

  return (
    <LectureContainer>
      <Lecture />
      <LectureTab handleNavigate={navigate} />
    </LectureContainer>
  );
}
