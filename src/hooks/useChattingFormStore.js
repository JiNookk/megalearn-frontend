import { useEffect } from 'react';
import { chattingFormStore } from '../stores/ChattingFormStore';
import useForceUpdate from './useForceUpdate';

export default function useChattingFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    chattingFormStore.subscribe(forceUpdate);

    return () => chattingFormStore.unsubscribe(forceUpdate);
  });

  return chattingFormStore;
}
