import { useEffect } from 'react';
import { likeStore } from '../stores/LikeStore';
import useForceUpdate from './useForceUpdate';

export default function useLikeStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    likeStore.subscribe(forceUpdate);

    return () => likeStore.unsubscribe(forceUpdate);
  });

  return likeStore;
}
