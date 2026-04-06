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

const INSTANCE_BASE = '/instance';

export const instanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstances: builder.query<GetInstanceResponse, void>({
      query: () => `${INSTANCE_BASE}/all`,
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Instance' as const, id: String(id) })),
              { type: 'Instance', id: 'LIST' },
            ]
          : [{ type: 'Instance', id: 'LIST' }],
    }),
    getInstanceById: builder.query<GetInstanceByIdResponse, GetInstanceByIdRequest>({
      query: ({ instanceId }) => `${INSTANCE_BASE}/${instanceId}`,
      providesTags: (result, error, { instanceId }) => [{ type: 'Instance', id: instanceId }],
    }),
    addInstance: builder.mutation<AddInstanceDataResponse, AddInstanceRequest>({
      query: (params) => ({
        url: `${INSTANCE_BASE}/add`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: [{ type: 'Instance', id: 'LIST' }],
    }),
    updateInstance: builder.mutation<UpdateInstanceResponse, UpdateInstanceRequest>({
      query: ({ id, ...params }) => ({
        url: `${INSTANCE_BASE}/edit/${id}`,
        method: 'PATCH',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Instance', id }],
    }),
    deleteInstance: builder.mutation<DeleteInstanceResponse, DeleteInstanceRequest>({
      query: ({ id }) => ({
        url: `${INSTANCE_BASE}/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Instance', id },
        { type: 'Instance', id: 'LIST' },
      ],
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
