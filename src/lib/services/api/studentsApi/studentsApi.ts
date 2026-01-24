import { api } from '../api';
import {
  AddStudentsDataResponse,
  AddStudentsRequest,
  DeleteStudentsRequest,
  DeleteStudentsResponse,
  GetStudentsByIdRequest,
  GetStudentsByIdResponse,
  GetStudentsResponse,
  UpdateStudentsRequest,
  UpdateStudentsResponse,
} from './interface';

export const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<GetStudentsResponse, void>({
      query: () => '/students/all',
      providesTags: ['Students'],
    }),
    getStudentById: builder.query<GetStudentsByIdResponse, GetStudentsByIdRequest>({
      query: ({ studentId }) => `/students/${studentId}`,
      providesTags: (result, error, { studentId }) => [{ type: 'Students', id: studentId }],
    }),
    addStudent: builder.mutation<AddStudentsDataResponse, AddStudentsRequest>({
      query: (params) => ({
        url: '/students/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Students'],
    }),
    updateStudent: builder.mutation<UpdateStudentsResponse, UpdateStudentsRequest>({
      query: ({ id, ...params }) => ({
        url: `/students/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Students' }, { type: 'Students', id }],
    }),
    deleteStudent: builder.mutation<DeleteStudentsResponse, DeleteStudentsRequest>({
      query: ({ id }) => ({
        url: `/students/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Students' }, { type: 'Students', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetStudentsQuery,
  useGetStudentByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
