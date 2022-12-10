import { useEffect } from 'react';
import { noteStore } from '../stores/NoteStore';
import useForceUpdate from './useForceUpdate';

export default function useNoteStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    noteStore.subscribe(forceUpdate);

    return () => noteStore.unsubscribe(forceUpdate);
  });

  return noteStore;
}
