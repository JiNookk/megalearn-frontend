import { useEffect } from 'react';
import { paymentStore } from '../stores/PaymentStore';
import useForceUpdate from './useForceUpdate';

export default function usePaymentStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    paymentStore.subscribe(forceUpdate);

    return () => paymentStore.unsubscribe(forceUpdate);
  });

  return paymentStore;
}
