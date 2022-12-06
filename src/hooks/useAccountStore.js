import { useState } from 'react';

export default function useAccountStore() {
  const [, forceUpdate] = useState(0);

  return () => forceUpdate((value) => value + 1);
}
