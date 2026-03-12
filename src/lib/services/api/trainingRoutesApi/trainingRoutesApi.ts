import { api } from '../api';
import {
  AddTrainingRouteRequest,
  AddTrainingRouteResponse,
  DeleteTrainingRouteRequest,
  DeleteTrainingRouteResponse,
  GetTrainingRouteByIdRequest,
  GetTrainingRouteByIdResponse,
  GetTrainingRoutesByCompanyRequest,
  GetTrainingRoutesResponse,
  UpdateTrainingRouteRequest,
  UpdateTrainingRouteResponse,
} from './interface';

export const trainingRoutesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTrainingRoutes: builder.query<GetTrainingRoutesResponse, void>({
      query: () => '/training-routes/all',
      providesTags: ['TrainingRoutes'],
    }),
    getTrainingRouteById: builder.query<GetTrainingRouteByIdResponse, GetTrainingRouteByIdRequest>({
      query: ({ id }) => `/training-routes/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'TrainingRoutes', id }],
    }),
    getTrainingRoutesByCompany: builder.query<GetTrainingRoutesResponse, GetTrainingRoutesByCompanyRequest>({
      query: ({ companyId }) => `/training-routes/company/${companyId}`,
      providesTags: (result, error, { companyId }) => [{ type: 'TrainingRoutes', id: `company-${companyId}` }],
    }),
    addTrainingRoute: builder.mutation<AddTrainingRouteResponse, AddTrainingRouteRequest>({
      query: (params) => ({
        url: '/training-routes/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['TrainingRoutes'],
    }),
    updateTrainingRoute: builder.mutation<UpdateTrainingRouteResponse, UpdateTrainingRouteRequest>({
      query: ({ id, ...params }) => ({
        url: `/training-routes/edit/${id}`,
        method: 'PATCH',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'TrainingRoutes' }, { type: 'TrainingRoutes', id }],
    }),
    deleteTrainingRoute: builder.mutation<DeleteTrainingRouteResponse, DeleteTrainingRouteRequest>({
      query: ({ id }) => ({
        url: `/training-routes/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'TrainingRoutes' }, { type: 'TrainingRoutes', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTrainingRoutesQuery,
  useGetTrainingRouteByIdQuery,
  useGetTrainingRoutesByCompanyQuery,
  useAddTrainingRouteMutation,
  useUpdateTrainingRouteMutation,
  useDeleteTrainingRouteMutation,
} = trainingRoutesApi;
