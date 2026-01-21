export interface GetCoursesResponse {
  data: Courses[];
}

export interface Courses {
  id: number;
  fullName: string;
  shortName: string;
  categoryId: number;
  status: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  companyId?: number;
  companyName?: string;
  companies?: Array<{
    //Array
    id: number /* Esta es la posición 0 del array, tanto id como name */;
    name: string;
  }>;
}

export interface AddCoursesRequest {
  fullName: string;
  shortName: string;
  categoryId: number;
  status: string;
  summary: string;
  startDate: string;
  endDate: string;
  companyId?: number;
}

export interface AddCoursesDataResponse {
  data: {
    fullName: string;
    shortName: string;
    categoryId: number;
    status: string;
    summary: string;
    startDate: string;
    endDate: string;
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
  fullName: string;
  shortName: string;
  categoryId: number;
  status: string;
  summary: string;
  startDate?: string;
  endDate?: string;
  companyId?: number;
}

export interface UpdateCoursesResponse {
  data: {
    fullName: string;
    shortName: string;
    categoryId: number;
    status: string;
    summary: string;
    startDate: string;
    endDate: string;
  };
  isSuccess: boolean;
}

export interface DeleteCoursesRequest {
  id: number;
}

export interface DeleteCoursesResponse {
  isSuccess: boolean;
}
