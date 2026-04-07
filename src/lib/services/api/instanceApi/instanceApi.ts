import { api } from '../api';
import {
  AddInstanceDataResponse,
  AddInstanceRequest,
  DeleteInstanceRequest,
  DeleteInstanceResponse,
  GetInstanceByIdRequest,
  GetInstanceByIdResponse,
  GetInstanceResponse,
  UpdateInstanceRequest,
  UpdateInstanceResponse,
} from './interface';

export const instanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstances: builder.query<GetInstanceResponse, void>({
      query: () => '/instance/all',
      providesTags: ['Instance'],
    }),
    getInstanceById: builder.query<GetInstanceByIdResponse, GetInstanceByIdRequest>({
      query: ({ instanceId }) => `/instance/${instanceId}`,
      providesTags: (result, error, { instanceId }) => [{ type: 'Instance', id: instanceId }],
    }),
    addInstance: builder.mutation<AddInstanceDataResponse, AddInstanceRequest>({
      query: (params) => ({
        url: '/instance/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Instance'],
    }),
    updateInstance: builder.mutation<UpdateInstanceResponse, UpdateInstanceRequest>({
      query: ({ id, ...params }) => ({
        url: `/instance/edit/${id}`,
        method: 'PATCH',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Instance' }, { type: 'Instance', id: id }],
    }),
    deleteInstance: builder.mutation<DeleteInstanceResponse, DeleteInstanceRequest>({
      query: ({ id }) => ({
        url: `/instance/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Instance' }, { type: 'Instance', id: id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetInstancesQuery,
  useGetInstanceByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddInstanceMutation,
  useUpdateInstanceMutation,
  useDeleteInstanceMutation,
} = instanceApi;
