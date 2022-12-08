import { useEffect } from 'react';
import { messageStore } from '../stores/MessageStore';
import useForceUpdate from './useForceUpdate';

export default function useMessageStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    messageStore.subscribe(forceUpdate);

    return () => messageStore.unsubscribe(forceUpdate);
  });

  return messageStore;
}
