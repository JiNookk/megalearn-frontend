import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Course from '../components/Course';
import useCourseStore from '../hooks/useCourseStore';

export default function CoursePage() {
  const navigate = useNavigate();

  const courseStore = useCourseStore();

  const courseId = window.location.pathname.split('/')[2];

  const handleNavigate = ({ lectureId }) => {
    navigate(`/courses/${courseId}/unit/${lectureId}`);
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
  }, []);

  return (
    <Course course={courseStore.course} handleNavigate={handleNavigate} />
  );
}
