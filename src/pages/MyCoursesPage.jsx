import { useEffect } from 'react';
import MyCourses from '../components/MyCourses';
import useCourseStore from '../hooks/useCourseStore';

export default function MyCoursesPage() {
  const courseStore = useCourseStore();

  useEffect(() => {
    courseStore.fetchMyCourses();
  }, []);

  return (
    <MyCourses />
  );
}
