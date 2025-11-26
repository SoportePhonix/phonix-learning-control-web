'use client';

import { useRef } from 'react';

import { Provider } from 'react-redux';

import { AppStore, makeStore } from '../lib/store';

interface Props {
  children: React.ReactNode;
}

export function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
