import { useEffect } from 'react';
import { cartStore } from '../stores/CartStore';
import useForceUpdate from './useForceUpdate';

export default function useCartStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    cartStore.subscribe(forceUpdate);

    return () => cartStore.unsubscribe(forceUpdate);
  });

  return cartStore;
}
