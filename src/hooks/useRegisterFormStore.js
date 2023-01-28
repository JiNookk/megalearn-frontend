import { useEffect } from 'react';
import { registerFormStore } from '../stores/formstores/RegisterFormStore';
import useForceUpdate from './useForceUpdate';

export default function useRegisterFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    registerFormStore.subscribe(forceUpdate);

    return () => registerFormStore.unsubscribe(forceUpdate);
  });

  return registerFormStore;
}
