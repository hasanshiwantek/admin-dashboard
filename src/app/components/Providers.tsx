// components/Providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect } from 'react';
import { setBaseURL } from '@/redux/slices/configSlice';

export default function Providers({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const savedURL = localStorage.getItem("baseURL");
    if (savedURL) {
      store.dispatch(setBaseURL(savedURL));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
