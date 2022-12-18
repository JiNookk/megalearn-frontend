import { useEffect } from 'react';
import { commentFormStore } from '../stores/formstores/CommentFormStore';
import useForceUpdate from './useForceUpdate';

export default function useCommentFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    commentFormStore.subscribe(forceUpdate);

    return () => commentFormStore.unsubscribe(forceUpdate);
  });

  return commentFormStore;
}
