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
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetCoursesQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
} = coursesApi;
