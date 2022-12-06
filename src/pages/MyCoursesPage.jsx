import { useEffect } from 'react';
import MyCourses from '../components/MyCourses';
import useCoursesStore from '../hooks/useCoursesStore';

export default function MyCoursesPage() {
  const coursesStore = useCoursesStore();

  useEffect(() => {
    coursesStore.fetchMyCourses();
  }, []);

  return (
    <MyCourses />
  );
}
