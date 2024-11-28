import { configureStore } from '@reduxjs/toolkit';

import { api } from './services/api';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    devTools: true,
    middleware: (gDM) => gDM().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
