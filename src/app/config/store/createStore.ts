import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './stateSchema';
import { jsonInstanceApi } from '@/shared/api/jsonInstanceApi';

export const createStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [jsonInstanceApi.reducerPath]: jsonInstanceApi.reducer
  };

  const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(jsonInstanceApi.middleware)
  });

  return store;
};
