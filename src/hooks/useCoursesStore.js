import { useEffect } from 'react';
import { coursesStore } from '../stores/CoursesStore';
import useForceUpdate from './useForceUpdate';

export default function useCoursesStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    coursesStore.subscribe(forceUpdate);

    return () => coursesStore.unsubscribe(forceUpdate);
  });

  return coursesStore;
}
