import { useEffect } from 'react';
import useCourseStore from '../hooks/useCourseStore';
import Courses from './Courses';

export default function WishList() {
  const courseStore = useCourseStore();

  useEffect(() => {
    courseStore.fetchWishList();
  }, []);

  return (
    <Courses />
  );
}
