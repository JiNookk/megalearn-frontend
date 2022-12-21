import { useEffect } from 'react';
import { sectionStore } from '../stores/SectionStore';
import useForceUpdate from './useForceUpdate';

export default function useSectionStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    sectionStore.subscribe(forceUpdate);

    return () => sectionStore.unsubscribe(forceUpdate);
  });

  return sectionStore;
}
