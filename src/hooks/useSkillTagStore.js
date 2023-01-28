import { useEffect } from 'react';
import { skillTagStore } from '../stores/SkillTagStore';
import useForceUpdate from './useForceUpdate';

export default function useSkillTagStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    skillTagStore.subscribe(forceUpdate);

    return () => skillTagStore.unsubscribe(forceUpdate);
  });

  return skillTagStore;
}
