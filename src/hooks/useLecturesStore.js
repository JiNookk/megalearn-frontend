import { useEffect } from 'react';
import { lecturesStore } from '../stores/LecturesStore';
import useForceUpdate from './useForceUpdate';

export default function useLecturesStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    lecturesStore.subscribe(forceUpdate);

    return () => lecturesStore.unsubscribe(forceUpdate);
  });

  return lecturesStore;
}
