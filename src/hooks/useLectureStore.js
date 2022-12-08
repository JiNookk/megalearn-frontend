import { useEffect } from 'react';
import { lectureStore } from '../stores/LectureStore';
import useForceUpdate from './useForceUpdate';

export default function useLectureStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    lectureStore.subscribe(forceUpdate);

    return () => lectureStore.unsubscribe(forceUpdate);
  });

  return lectureStore;
}
