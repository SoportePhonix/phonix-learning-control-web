import { api } from '../api';
import {
  CreateInstanceCompanyRequest,
  CreateInstanceCompanyResponse,
  DeleteInstanceCompanyRequest,
  DeleteInstanceCompanyResponse,
  GetAllInstanceCompanyResponse,
  GetCompaniesByInstanceRequest,
  GetCompaniesByInstanceResponse,
  GetInstancesByCompanyRequest,
  GetInstancesByCompanyResponse,
} from './interface';

export const instanceCompanyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstanceCompany: builder.query<GetAllInstanceCompanyResponse, void>({
      query: () => '/instance-company',
      providesTags: ['InstanceCompany'],
    }),
    getCompaniesByInstance: builder.query<GetCompaniesByInstanceResponse, GetCompaniesByInstanceRequest>({
      query: ({ instanceId }) => `/instance-company/instance/${instanceId}`,
      providesTags: (result, error, { instanceId }) => [
        { type: 'InstanceCompany', id: `instance-${instanceId}` },
        { type: 'InstanceCompany', id: 'LIST' },
      ],
    }),
    getInstancesByCompany: builder.query<GetInstancesByCompanyResponse, GetInstancesByCompanyRequest>({
      query: ({ companyId }) => `/instance-company/company/${companyId}`,
      providesTags: (result, error, { companyId }) => [
        { type: 'InstanceCompany', id: `company-${companyId}` },
        { type: 'InstanceCompany', id: 'LIST' },
      ],
    }),
    createInstanceCompany: builder.mutation<CreateInstanceCompanyResponse, CreateInstanceCompanyRequest>({
      query: (params) => ({
        url: '/instance-company',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: (result, error, { instanceId, companyId }) => [
        { type: 'InstanceCompany', id: 'LIST' },
        { type: 'InstanceCompany', id: `instance-${instanceId}` },
        { type: 'InstanceCompany', id: `company-${companyId}` },
      ],
    }),
    deleteInstanceCompany: builder.mutation<DeleteInstanceCompanyResponse, DeleteInstanceCompanyRequest>({
      query: ({ instanceId, companyId }) => ({
        url: `/instance-company/${instanceId}/${companyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { instanceId, companyId }) => [
        { type: 'InstanceCompany', id: 'LIST' },
        { type: 'InstanceCompany', id: `instance-${instanceId}` },
        { type: 'InstanceCompany', id: `company-${companyId}` },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllInstanceCompanyQuery,
  useGetCompaniesByInstanceQuery,
  useGetInstancesByCompanyQuery,
  useCreateInstanceCompanyMutation,
  useDeleteInstanceCompanyMutation,
} = instanceCompanyApi;
