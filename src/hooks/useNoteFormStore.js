import { useEffect } from 'react';
import { noteFormStore } from '../stores/formstores/NoteFormStore';
import useForceUpdate from './useForceUpdate';

export default function useNoteFormStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    noteFormStore.subscribe(forceUpdate);

    return () => noteFormStore.unsubscribe(forceUpdate);
  });

  return noteFormStore;
}
