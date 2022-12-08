import { useEffect } from 'react';
import { courseStore } from '../stores/CourseStore';
import useForceUpdate from './useForceUpdate';

export default function useCourseStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    courseStore.subscribe(forceUpdate);

    return () => courseStore.unsubscribe(forceUpdate);
  });

  return courseStore;
}
