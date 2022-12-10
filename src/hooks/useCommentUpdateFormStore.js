import { useEffect } from 'react';
import { commentUpdateFormStore } from '../stores/CommentUpdateFormStore';
import useForceUpdate from './useForceUpdate';

export default function useCommentUpdateFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    commentUpdateFormStore.subscribe(forceUpdate);

    return () => commentUpdateFormStore.unsubscribe(forceUpdate);
  });

  return commentUpdateFormStore;
}
