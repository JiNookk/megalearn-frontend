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

  // 내가 원하는것 `/courses/${courseId}/unit/${lectureId}/productId={lectureProduct}
  // 근데 왜 lectureProductId를 가져오지 못할까? => 애초에 account가 여기에 없기 때문에 프론트에서 처리해줄 숭 ㅓㅂㅅ다.
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
