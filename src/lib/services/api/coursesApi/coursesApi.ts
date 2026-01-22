import { api } from '../api';
import {
  AddCoursesDataResponse,
  AddCoursesRequest,
  DeleteCoursesRequest,
  DeleteCoursesResponse,
  GetCoursesByIdRequest,
  GetCoursesByIdResponse,
  GetCoursesResponse,
  UpdateCoursesRequest,
  UpdateCoursesResponse,
} from './interface';

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<GetCoursesResponse, void>({
      query: () => '/courses/all',
      providesTags: ['Courses'],
    }),
    getCourseById: builder.query<GetCoursesByIdResponse, GetCoursesByIdRequest>({
      query: ({ courseId }) => `/courses/${courseId}`,
      providesTags: (result, error, { courseId }) => [{ type: 'Courses', id: courseId }],
    }),
    addCourses: builder.mutation<AddCoursesDataResponse, AddCoursesRequest>({
      query: (params) => ({
        url: '/courses/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Courses'],
    }),
    updateCourses: builder.mutation<UpdateCoursesResponse, UpdateCoursesRequest>({
      query: ({ id, ...params }) => ({
        url: `/courses/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Courses' }, { type: 'Courses', id }],
    }),
    deleteCourses: builder.mutation<DeleteCoursesResponse, DeleteCoursesRequest>({
      query: ({ id }) => ({
        url: `/courses/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Courses' }, { type: 'Courses', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetCoursesQuery,
  useGetCourseByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddCoursesMutation,
  useUpdateCoursesMutation,
  useDeleteCoursesMutation,
} = coursesApi;
