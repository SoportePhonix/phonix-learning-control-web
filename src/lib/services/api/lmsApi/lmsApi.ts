import { api } from '../api';
import {
  AddLmsDataResponse,
  AddLmsRequest,
  DeleteLmsRequest,
  DeleteLmsResponse,
  GetLmsByIdRequest,
  GetLmsByIdResponse,
  GetLmsResponse,
  UpdateLmsRequest,
  UpdateLmsResponse,
} from './interface';

export const lmsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLms: builder.query<GetLmsResponse, void>({
      query: () => '/lms/all',
      providesTags: ['Lms'],
    }),
    getLmsById: builder.query<GetLmsByIdResponse, GetLmsByIdRequest>({
      query: ({ lmsId }) => `/lms/${lmsId}`,
      providesTags: (result, error, { lmsId }) => [{ type: 'Lms', id: lmsId }],
    }),
    addLms: builder.mutation<AddLmsDataResponse, AddLmsRequest>({
      query: (params) => ({
        url: '/lms/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Lms'],
    }),
    updateLms: builder.mutation<UpdateLmsResponse, UpdateLmsRequest>({
      query: ({ id, ...params }) => ({
        url: `/lms/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Lms' }, { type: 'Lms', id }],
    }),
    deleteLms: builder.mutation<DeleteLmsResponse, DeleteLmsRequest>({
      query: ({ id }) => ({
        url: `/lms/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Lms' }, { type: 'Lms', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetLmsQuery,
  useGetLmsByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddLmsMutation,
  useUpdateLmsMutation,
  useDeleteLmsMutation,
} = lmsApi;
