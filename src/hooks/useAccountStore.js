import { useEffect } from 'react';
import { accountStore } from '../stores/AccountStore';
import useForceUpdate from './useForceUpdate';

export default function useAccountStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    accountStore.subscribe(forceUpdate);

    return () => accountStore.unsubscribe(forceUpdate);
  });

  return accountStore;
}
