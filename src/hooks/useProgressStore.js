import { useEffect } from 'react';
import { progressStore } from '../stores/ProgressStore';
import useForceUpdate from './useForceUpdate';

export default function useProgressStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    progressStore.subscribe(forceUpdate);

    return () => progressStore.unsubscribe(forceUpdate);
  });

  return progressStore;
}
