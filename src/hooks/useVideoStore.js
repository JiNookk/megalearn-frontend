import { useEffect } from 'react';
import { videoStore } from '../stores/VideoStore';
import useForceUpdate from './useForceUpdate';

export default function useVideoStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    videoStore.subscribe(forceUpdate);

    return () => videoStore.unsubscribe(forceUpdate);
  });

  return videoStore;
}
