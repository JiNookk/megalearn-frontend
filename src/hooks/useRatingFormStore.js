import { useEffect } from 'react';
import { ratingFormStore } from '../stores/formstores/RatingFormStore';
import useForceUpdate from './useForceUpdate';

export default function useRatingFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    ratingFormStore.subscribe(forceUpdate);

    return () => ratingFormStore.unsubscribe(forceUpdate);
  });

  return ratingFormStore;
}
