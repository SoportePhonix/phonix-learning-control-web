import { api } from '../api';
import {
  AddUserDataResponse,
  AddUserRequest,
  GetUserByIdResponse,
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './interface';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUsersResponse, void>({
      query: () => '/users/all',
      providesTags: ['Users'],
    }),
    getUserById: builder.query<GetUserByIdResponse, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    addUsers: builder.mutation<AddUserDataResponse, AddUserRequest>({
      query: (params) => ({
        url: '/users/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ id, ...params }) => ({
        url: `/users/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users' }, { type: 'Users', id }],
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
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApi;
