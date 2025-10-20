import { jsonInstanceApi } from '@/shared/api/jsonInstanceApi';

export interface StateSchema {
  [jsonInstanceApi.reducerPath]: ReturnType<typeof jsonInstanceApi.reducer>;
}
