import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseBanner from '../components/CourseBanner';
import CurriCulum from '../components/CurriCulum';
import useCourseStore from '../hooks/useCourseStore';
import useLecturesStore from '../hooks/useLecturesStore';

export default function CoursePage() {
  const navigate = useNavigate();

  const courseStore = useCourseStore();
  const lecturesStore = useLecturesStore();

  const courseId = window.location.pathname.split('/')[2];

  const onNavigate = ({ lectureId }) => {
    navigate(`/courses/${courseId}/unit/${lectureId}`, {
      state: { courseId, lectureId },
    });
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });

    lecturesStore.fetchLectures({ courseId });
  }, []);

  return (
    <div>
      <CourseBanner onNavigate={onNavigate} />
      <CurriCulum onNavigate={onNavigate} />
    </div>
  );
}
