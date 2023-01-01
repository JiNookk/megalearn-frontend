import { useEffect } from 'react';
import { sectionFormStore } from '../stores/formstores/SectionFormStore';
import useForceUpdate from './useForceUpdate';

export default function useSectionFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    sectionFormStore.subscribe(forceUpdate);

    return () => sectionFormStore.unsubscribe(forceUpdate);
  });

  return sectionFormStore;
}
