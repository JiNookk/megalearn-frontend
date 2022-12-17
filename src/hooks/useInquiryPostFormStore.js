import { useEffect } from 'react';
import { inquiryPostFormStore } from '../stores/InquiryPostFormStore';
import useForceUpdate from './useForceUpdate';

export default function useInquiryPostFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    inquiryPostFormStore.subscribe(forceUpdate);

    return () => inquiryPostFormStore.unsubscribe(forceUpdate);
  });

  return inquiryPostFormStore;
}
