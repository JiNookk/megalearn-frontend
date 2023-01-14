import { useEffect } from 'react';
import { dateStore } from '../stores/DateStore';
import useForceUpdate from './useForceUpdate';

export default function useDateStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    dateStore.subscribe(forceUpdate);

    return () => dateStore.unsubscribe(forceUpdate);
  });

  return dateStore;
}
