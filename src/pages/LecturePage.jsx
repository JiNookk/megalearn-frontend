import { useEffect } from 'react';
import Lecture from '../components/Lecture';
import useLectureStore from '../hooks/useLectureStore';

export default function LecturePage() {
  const lectureStore = useLectureStore();

  const lectureId = window.location.pathname.split('/')[4];

  useEffect(() => {
    lectureStore.fetchLecture({ lectureId });
  }, []);

  return (
    <Lecture />
  );
}
