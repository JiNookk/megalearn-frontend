import { useEffect } from 'react';
import { noteUpdateFormStore } from '../stores/formstores/NoteUpdateFormStore';
import useForceUpdate from './useForceUpdate';

export default function useNoteUpdateFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    noteUpdateFormStore.subscribe(forceUpdate);

    return () => noteUpdateFormStore.unsubscribe(forceUpdate);
  });

  return noteUpdateFormStore;
}
