import { useEffect } from 'react';
import { inquiryFilterFormStore } from '../stores/formstores/inquiryFilterFormStore';
import useForceUpdate from './useForceUpdate';

export default function useinquiryFilterFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    inquiryFilterFormStore.subscribe(forceUpdate);

    return () => inquiryFilterFormStore.unsubscribe(forceUpdate);
  });

  return inquiryFilterFormStore;
}
