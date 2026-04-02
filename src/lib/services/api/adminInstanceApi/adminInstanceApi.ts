import { api } from '../api';
import {
  AddAdminInstanceRequest,
  AddAdminInstanceResponse,
  DeleteAdminInstanceRequest,
  DeleteAdminInstanceResponse,
  GetAdminInstanceByInstanceResponse,
  GetAdminInstanceByUserResponse,
  GetAdminInstancesResponse,
} from './interface';

export const adminInstanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminInstances: builder.query<GetAdminInstancesResponse, void>({
      query: () => '/admin-instance',
      providesTags: ['AdminInstance'],
    }),
    getInstancesByUser: builder.query<GetAdminInstanceByUserResponse, { userId: number }>({
      query: ({ userId }) => `/admin-instance/user/${userId}`,
      providesTags: (result, error, { userId }) => [
        { type: 'AdminInstance', id: `User-${userId}` },
        { type: 'AdminInstance', id: 'LIST' },
      ],
    }),
    getAdminsByInstance: builder.query<GetAdminInstanceByInstanceResponse, { instanceId: number }>({
      query: ({ instanceId }) => `/admin-instance/instance/${instanceId}`,
      providesTags: (result, error, { instanceId }) => [
        { type: 'AdminInstance', id: `Instance-${instanceId}` },
        { type: 'AdminInstance', id: 'LIST' },
      ],
    }),
    createAdminInstance: builder.mutation<AddAdminInstanceResponse, AddAdminInstanceRequest>({
      query: (params) => ({
        url: '/admin-instance',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['AdminInstance'],
    }),
    deleteAdminInstance: builder.mutation<DeleteAdminInstanceResponse, DeleteAdminInstanceRequest>({
      query: ({ userId, instanceId }) => ({
        url: `/admin-instance/${userId}/${instanceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { userId, instanceId }) => [
        { type: 'AdminInstance' },
        { type: 'AdminInstance', id: `User-${userId}` },
        { type: 'AdminInstance', id: `Instance-${instanceId}` },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAdminInstancesQuery,
  useGetInstancesByUserQuery,
  useGetAdminsByInstanceQuery,
  useCreateAdminInstanceMutation,
  useDeleteAdminInstanceMutation,
} = adminInstanceApi;
