import { useEffect } from 'react';
import MyCourses from '../components/MyCourses';
import Container from '../components/ui/Container';
import useCourseStore from '../hooks/useCourseStore';

export default function MyCoursesPage() {
  const courseStore = useCourseStore();

  useEffect(() => {
    courseStore.fetchMyCourses();
  }, []);

  return (
    <Container>
      <MyCourses />
    </Container>
  );
}
