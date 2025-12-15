import { api } from '../api';
import { AddUserDataResponse, AddUserRequest, GetUsersResponse } from './interface';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUsersResponse, void>({
      query: () => '/users/all',
      providesTags: ['Users'],
    }),
    addUsers: builder.mutation<AddUserDataResponse, AddUserRequest>({
      query: (params) => ({
        url: '/users/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
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
