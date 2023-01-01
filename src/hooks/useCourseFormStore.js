import { useEffect } from 'react';
import { courseFormStore } from '../stores/formstores/CourseFormStore';
import useForceUpdate from './useForceUpdate';

export default function useCourseFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    courseFormStore.subscribe(forceUpdate);

    return () => courseFormStore.unsubscribe(forceUpdate);
  });

  return courseFormStore;
}
