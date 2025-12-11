import { api } from '../api';
import { AddUserDataResponse, AddUserRequest, GetUsersResponse } from './interface';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUsersResponse, void>({
      query: () => {
        return '/users/all';
      },
    }),
    addUsers: builder.mutation<AddUserDataResponse, AddUserRequest>({
      query: (params) => ({
        url: '/users/add',
        method: 'POST',
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  /**
   * Get
   */
  useGetAllUsersQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddUsersMutation,
} = usersApi;
