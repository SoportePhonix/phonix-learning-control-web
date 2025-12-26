import { api } from '../api';
import {
  AddUserDataResponse,
  AddUserRequest,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserByIdRequest,
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
    getUserById: builder.query<GetUserByIdResponse, GetUserByIdRequest>({
      query: ({ userId }) => `/users/${userId}`,
      providesTags: (result, error, { userId }) => [{ type: 'Users', id: userId }],
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
    deleteUser: builder.mutation<DeleteUserResponse, DeleteUserRequest>({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users' }, { type: 'Users', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddUsersMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
