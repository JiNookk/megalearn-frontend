import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseBanner from '../components/banners/CourseBanner';
import CurriCulum from '../components/CurriCulum';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';

export default function CoursePage() {
  const navigate = useNavigate();

  const courseStore = useCourseStore();
  const lectureStore = useLectureStore();

  const courseId = window.location.pathname.split('/')[2];

  const onNavigate = ({ lectureId }) => {
    navigate(`/courses/${courseId}/lectures/${lectureId}`, {
      state: { courseId, lectureId },
    });
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });

    lectureStore.fetchLectures({ courseId });
  }, []);

  return (
    <div>
      <CourseBanner onNavigate={onNavigate} />
      <CurriCulum onNavigate={onNavigate} />
    </div>
  );
}
