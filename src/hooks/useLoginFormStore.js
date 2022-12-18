import { useEffect } from 'react';
import { loginFormStore } from '../stores/formstores/LoginFormStore';
import useForceUpdate from './useForceUpdate';

export default function useLoginFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    loginFormStore.subscribe(forceUpdate);

    return () => loginFormStore.unsubscribe(forceUpdate);
  });

  return loginFormStore;
}
