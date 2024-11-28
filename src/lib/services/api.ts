import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LogoutRequest, LogoutResponse } from './interfaces/logout';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  }),

  endpoints: (builder) => ({
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (studentId) => ({
        url: '/admin/user/logout',
        method: 'POST',
        body: studentId.studentId,
      }),
    }),
  }),
});

export const {
  // Queries
  /**Mutation */
  useLogoutMutation,
} = api;
