import { useEffect } from 'react';
import { commentStore } from '../stores/CommentStore';
import useForceUpdate from './useForceUpdate';

export default function useCommentStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    commentStore.subscribe(forceUpdate);

    return () => commentStore.unsubscribe(forceUpdate);
  });

  return commentStore;
}
