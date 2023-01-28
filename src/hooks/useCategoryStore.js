import { useEffect } from 'react';
import { categoryStore } from '../stores/CategoryStore';
import useForceUpdate from './useForceUpdate';

export default function useCategoryStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    categoryStore.subscribe(forceUpdate);

    return () => categoryStore.unsubscribe(forceUpdate);
  });

  return categoryStore;
}
