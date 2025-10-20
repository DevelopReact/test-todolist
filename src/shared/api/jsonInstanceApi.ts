import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { jsonBaseUrl } from '../constants/jsonBaseUrl';

export const jsonInstanceApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: jsonBaseUrl }),
  tagTypes: ['Todos'],

  endpoints: () => ({})
});
