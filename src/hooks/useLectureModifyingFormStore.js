import { useEffect } from 'react';
import { lectureModifyingFormStore } from '../stores/formstores/LectureModifyingFormStore';
import useForceUpdate from './useForceUpdate';

export default function useLectureModifyingFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    lectureModifyingFormStore.subscribe(forceUpdate);

    return () => lectureModifyingFormStore.unsubscribe(forceUpdate);
  });

  return lectureModifyingFormStore;
}
