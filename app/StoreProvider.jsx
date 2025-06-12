'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>;
}

