import { useEffect } from 'react';
import { ratingStore } from '../stores/RatingStore';
import useForceUpdate from './useForceUpdate';

export default function useRatingStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    ratingStore.subscribe(forceUpdate);

    return () => ratingStore.unsubscribe(forceUpdate);
  });

  return ratingStore;
}
