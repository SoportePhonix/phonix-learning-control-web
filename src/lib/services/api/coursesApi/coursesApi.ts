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
      providesTags: (result, error, { courseId }) => [{ type: 'Companies', id: courseId }],
    }),
    addCourses: builder.mutation<AddCoursesDataResponse, AddCoursesRequest>({
      query: (params) => ({
        url: '/courses/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Courses'],
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
} = coursesApi;
