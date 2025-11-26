import { api } from '../api';
import { LogoutRequest, LogoutResponse } from './interface';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (data) => ({
        url: '/admin/user/logout',
        method: 'POST',
        body: data.userId,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation } = authApi;
