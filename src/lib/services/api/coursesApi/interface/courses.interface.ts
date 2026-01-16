export interface GetCoursesResponse {
  data: Courses[];
}

export interface Courses {
  id: number;
  fullName: string;
  shortName: string;
  categoryId: number;
  summary: string;
  visible: number;
  startDate: number;
  endDate: number;
}

export interface AddCoursesRequest {
  fullName: string;
  shortName: string;
  categoryId: number;
  summary: string;
  visible: number;
  startDate: string;
  endDate: string;
}

export interface AddCoursesDataResponse {
  data: {
    fullName: string;
    shortName: string;
    categoryId: number;
    summary: string;
    visible: number;
    startDate: number;
    endDate: number;
  };
  isSuccess: boolean;
}

export interface GetCoursesByIdResponse {
  data: Courses;
}

export interface GetCoursesByIdRequest {
  courseId: string;
}

export interface UpdateCoursesRequest {
  id: number;
  name: string;
  nit: string;
  email: string;
  status: string;
}

export interface UpdateCoursesResponse {
  data: {
    name: string;
    nit: string;
    email: string;
    status: string;
  };
  isSuccess: boolean;
}

export interface DeleteCoursesRequest {
  id: number;
}

export interface DeleteCoursesResponse {
  isSuccess: boolean;
}
