import { useEffect } from 'react';
import { searchFormStore } from '../stores/formstores/SearchFormStore';
import useForceUpdate from './useForceUpdate';

export default function useSearchFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    searchFormStore.subscribe(forceUpdate);

    return () => searchFormStore.unsubscribe(forceUpdate);
  });

  return searchFormStore;
}
